import { NextResponse } from "next/server";

const systemPrompt = `You are NEXORA DIGITAL's AI assistant.
NEXORA is an AI-powered platform for creating, renewing, and managing modern websites.
Answer clearly, professionally, and concisely.
Supported topics include website creation, website renewal, AI Studio, projects, plans, pricing, accounts, payments, and platform support.
Do not invent prices, features, policies, or guarantees.
Current plans: Starter €99/month, Business €299/month, Growth €699/month, Enterprise Custom.
If information is unavailable, say so clearly and recommend contacting NEXORA support.
Reply in the same language as the user whenever possible.`;

const fallback = (question: string) => {
  const q = question.toLowerCase();
  if (q.includes("price") || q.includes("pricing") || q.includes("السعر") || q.includes("الأسعار") || q.includes("باقات")) {
    return "الخطط الحالية: Starter €99 شهريًا، Business €299، Growth €699، وEnterprise بسعر مخصص.";
  }
  if (q.includes("create") || q.includes("إنشاء") || q.includes("انشاء")) {
    return "يمكنك بدء مشروع جديد من AI Studio وكتابة فكرة الموقع وأهدافه، ثم تجهيز اتجاه المشروع وخطة البناء.";
  }
  if (q.includes("renew") || q.includes("تجديد") || q.includes("تطوير")) {
    return "نعم. NEXORA مخصصة أيضًا لتجديد وتحديث المواقع الموجودة وتحويلها إلى تجربة حديثة.";
  }
  return "أستطيع مساعدتك في NEXORA، AI Studio، إنشاء المواقع، تجديد المواقع، الأسعار والخطط. هذا السؤال يحتاج إلى معرفة إضافية غير متاحة حاليًا.";
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const question = messages.at(-1)?.content?.toString().trim();

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: fallback(question),
        source: "fallback"
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-12).map((message: { role: string; content: string }) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.content
          }))
        ]
      })
    });

    if (!response.ok) {
      return NextResponse.json({
        answer: fallback(question),
        source: "fallback"
      });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      answer: answer || fallback(question),
      source: "ai"
    });
  } catch {
    return NextResponse.json({
      answer: "حدث خطأ مؤقت في المساعد. حاول مرة أخرى.",
      source: "fallback"
    });
  }
}
