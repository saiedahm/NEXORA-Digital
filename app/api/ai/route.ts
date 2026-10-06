import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const PLAN_LIMITS: Record<string, number | null> = {
  free: 20,
  starter: 200,
  business: 1000,
  growth: 5000,
  enterprise: null,
};

async function getSupabase() {
  const store = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!prompt) return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    if (prompt.length > 4000) return NextResponse.json({ error: "Prompt is too long." }, { status: 400 });

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in to use AI Studio." }, { status: 401 });
    }

    const { data: membership } = await supabase
      .from("memberships")
      .select("organization_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!membership) return NextResponse.json({ error: "Your NEXORA workspace was not found." }, { status: 403 });

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan, status")
      .eq("organization_id", membership.organization_id)
      .maybeSingle();

    const plan = subscription?.plan || "free";
    const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;

    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("usage_events")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", membership.organization_id)
      .eq("event_type", "ai_message")
      .gte("created_at", startOfMonth.toISOString());

    const used = count || 0;
    if (limit !== null && used >= limit) {
      return NextResponse.json(
        { error: `Your ${plan} plan has reached its monthly AI limit of ${limit} messages.`, usage: { used, limit, plan } },
        { status: 429 }
      );
    }

    const safeHistory: ChatMessage[] = history
      .filter(
        (message: unknown): message is ChatMessage =>
          typeof message === "object" &&
          message !== null &&
          ((message as ChatMessage).role === "user" || (message as ChatMessage).role === "assistant") &&
          typeof (message as ChatMessage).content === "string"
      )
      .slice(-12)
      .map((message: ChatMessage) => ({ role: message.role, content: message.content.slice(0, 4000) }));

    const apiKey = process.env.NEXORA_OPENAI_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-6-luna";
    if (!apiKey) return NextResponse.json({ error: "AI service is not configured yet." }, { status: 503 });

    const input = [
      {
        role: "system",
        content: [{ type: "input_text", text: "You are NEXORA AI Studio. Give clear, useful and concise answers for digital work, websites, content and technology tasks. Understand previous messages and continue naturally." }],
      },
      ...safeHistory.map((message) => ({
        role: message.role,
        content: [{ type: message.role === "user" ? "input_text" : "output_text", text: message.content }],
      })),
      { role: "user", content: [{ type: "input_text", text: prompt }] },
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input }),
      cache: "no-store",
    });

    if (!response.ok) return NextResponse.json({ error: "The AI service could not process the request." }, { status: 502 });

    const data = await response.json();
    const text = typeof data?.output_text === "string"
      ? data.output_text
      : data?.output?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item?.content ?? [])
          ?.find((item: { type?: string; text?: string }) => item?.type === "output_text")?.text;

    if (!text) return NextResponse.json({ error: "The AI service returned an empty response." }, { status: 502 });

    const { data: event } = await supabase
      .from("usage_events")
      .insert({
        organization_id: membership.organization_id,
        user_id: user.id,
        event_type: "ai_message",
        units: 1,
      })
      .select("id")
      .single();

    if (!event) return NextResponse.json({ error: "AI response completed but usage could not be recorded." }, { status: 500 });

    return NextResponse.json({
      response: text,
      usage: { used: used + 1, limit, plan },
    });
  } catch {
    return NextResponse.json({ error: "Unable to process the AI request." }, { status: 500 });
  }
}
