import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > 4000) {
      return NextResponse.json(
        { error: "Prompt is too long." },
        { status: 400 }
      );
    }

    const safeHistory: ChatMessage[] = history
      .filter(
        (message: unknown): message is ChatMessage =>
          typeof message === "object" &&
          message !== null &&
          ((message as ChatMessage).role === "user" ||
            (message as ChatMessage).role === "assistant") &&
          typeof (message as ChatMessage).content === "string"
      )
      .slice(-12)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 4000),
      }));

    const apiKey = process.env.NEXORA_OPENAI_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-6-luna";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured yet." },
        { status: 503 }
      );
    }

    const input = [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "You are NEXORA AI Studio. Give clear, useful and concise answers for digital work, websites, content and technology tasks. Understand the previous messages and continue the conversation naturally.",
          },
        ],
      },
      ...safeHistory.map((message) => ({
        role: message.role,
        content: [
          {
            type: message.role === "user" ? "input_text" : "output_text",
            text: message.content,
          },
        ],
      })),
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: prompt,
          },
        ],
      },
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, input }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "The AI service could not process the request." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const text =
      typeof data?.output_text === "string"
        ? data.output_text
        : data?.output
            ?.flatMap(
              (item: {
                content?: Array<{ type?: string; text?: string }>;
              }) => item?.content ?? []
            )
            ?.find(
              (item: { type?: string; text?: string }) =>
                item?.type === "output_text"
            )?.text;

    if (!text) {
      return NextResponse.json(
        { error: "The AI service returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ response: text });
  } catch {
    return NextResponse.json(
      { error: "Unable to process the AI request." },
      { status: 500 }
    );
  }
}
