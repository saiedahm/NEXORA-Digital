import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the NEXORA DIGITAL project manager. Do not give a generic acknowledgement. Have a real conversation with the customer and move the request toward a concrete deliverable.

Your job is to:
1. Understand what the customer wants to build, update, repair or redesign.
2. Ask only the minimum missing questions needed to define the work.
3. Explain what will be delivered in practical terms.
4. Clearly distinguish discussion/quotation from paid execution.
5. Never claim a website was changed, deployed or delivered unless the execution system actually completed it.
6. When the customer asks to proceed with paid work, state that a project must be created and the applicable Stripe payment confirmed before execution is unlocked.
7. Reply in the customer's language.

Return JSON with: reply (string), nextStep (string), serviceType (string), needsClarification (boolean), readyForProject (boolean).`;

function normalizeQuestion(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1000);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const language = typeof body?.language === "string" ? body.language.slice(0, 20) : "de";
  const history = Array.isArray(body?.history) ? body.history.slice(-12) : [];
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  // AI Pod: only reuse an answer when there is no conversation history.
  // This prevents a cached answer from being incorrectly reused inside a project conversation.
  const normalizedQuestion = normalizeQuestion(message);
  if (!history.length && normalizedQuestion) {
    const cached = await prisma.aiPodMemory.findUnique({
      where: { language_normalizedQuestion: { language, normalizedQuestion } },
    }).catch((error) => {
      console.error("NEXORA AI Pod read error", error);
      return null;
    });

    if (cached) {
      await prisma.aiPodMemory.update({
        where: { id: cached.id },
        data: { hits: { increment: 1 }, lastUsedAt: new Date() },
      }).catch((error) => console.error("NEXORA AI Pod hit update error", error));

      return NextResponse.json({
        ok: true,
        source: "pod",
        reply: cached.answer,
        nextStep: cached.nextStep,
        serviceType: cached.serviceType,
        needsClarification: cached.needsClarification,
        readyForProject: cached.readyForProject,
      });
    }
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "NEXORA AI is not configured." }, { status: 503 });

  const model = process.env.OPENAI_MODEL || process.env.AI_MODEL_DEFAULT || "gpt-5.6-luna";
  const input = [
    { role: "system", content: `${SYSTEM_PROMPT}\nCustomer language: ${language}` },
    ...history.map((item: any) => ({ role: item?.role === "assistant" ? "assistant" : "user", content: String(item?.content || "").slice(0, 5000) })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: input,
      response_format: { type: "json_object" },
      temperature: 0.25,
    }),
  });

  if (!response.ok) {
    console.error("NEXORA AI chat provider error", response.status, await response.text());
    return NextResponse.json({ error: "NEXORA AI could not answer right now." }, { status: 502 });
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;
  let result: any;
  try {
    result = JSON.parse(raw || "{}");
  } catch {
    result = {
      reply: String(raw || ""),
      nextStep: "Continue the project discussion.",
      serviceType: "General digital service",
      needsClarification: true,
      readyForProject: false,
    };
  }

  const answer = String(result.reply || "");
  const nextStep = String(result.nextStep || "Continue the project discussion.");
  const serviceType = String(result.serviceType || "Digital service");
  const needsClarification = Boolean(result.needsClarification);
  const readyForProject = Boolean(result.readyForProject);

  // Store only reusable, context-free answers. Conversations with history are not cached.
  if (!history.length && normalizedQuestion && answer) {
    await prisma.aiPodMemory.upsert({
      where: { language_normalizedQuestion: { language, normalizedQuestion } },
      create: {
        language,
        normalizedQuestion,
        question: message,
        answer,
        nextStep,
        serviceType,
        model,
        source: "ai",
        hits: 0,
        lastUsedAt: new Date(),
      },
      update: {
        question: message,
        answer,
        nextStep,
        serviceType,
        model,
        source: "ai",
        lastUsedAt: new Date(),
      },
    }).catch((error) => console.error("NEXORA AI Pod write error", error));
  }

  return NextResponse.json({
    ok: true,
    source: "ai",
    reply: answer,
    nextStep,
    serviceType,
    needsClarification,
    readyForProject,
  });
}
