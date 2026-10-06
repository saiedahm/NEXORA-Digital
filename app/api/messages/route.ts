import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("conversationId");
  if (!id) return NextResponse.json({ ok: false, error: "conversationId is required." }, { status: 400 });

  const store = await cookies();
  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: { getAll: () => store.getAll(), setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)) },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

  const { data, error } = await supabase.from("messages").select("id, role, content, created_at").eq("conversation_id", id).order("created_at", { ascending: true });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, messages: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";
    const role = body?.role === "assistant" ? "assistant" : "user";
    const content = typeof body?.content === "string" ? body.content.trim() : "";
    if (!conversationId || !content || content.length > 12000) return NextResponse.json({ ok: false, error: "Invalid message." }, { status: 400 });

    const store = await cookies();
    const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      cookies: { getAll: () => store.getAll(), setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)) },
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

    const { data: conversation } = await supabase.from("conversations").select("id").eq("id", conversationId).eq("user_id", user.id).maybeSingle();
    if (!conversation) return NextResponse.json({ ok: false, error: "Conversation not found." }, { status: 404 });

    const { data, error } = await supabase.from("messages").insert({ conversation_id: conversationId, role, content }).select("id, role, content, created_at").single();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId).eq("user_id", user.id);
    return NextResponse.json({ ok: true, message: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Message could not be saved." }, { status: 500 });
  }
}
