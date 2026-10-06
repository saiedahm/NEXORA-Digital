import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

async function client() {
  const store = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
}

export async function GET() {
  const supabase = await client();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

  const { data: membership } = await supabase.from("memberships").select("organization_id, role, organizations(id, name, slug)").eq("user_id", user.id).limit(1).maybeSingle();
  if (!membership) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

  const orgId = membership.organization_id;
  const [{ count: projects }, { count: conversations }, { count: messages }, { data: usage }] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("organization_id", orgId),
    supabase.from("conversations").select("id", { count: "exact", head: true }).eq("organization_id", orgId),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("usage_events").select("event_type, units").eq("user_id", user.id),
  ]);

  const aiMessages = (usage || []).filter((e) => e.event_type === "ai_message").reduce((sum, e) => sum + e.units, 0);
  const aiResponses = (usage || []).filter((e) => e.event_type === "ai_response").reduce((sum, e) => sum + e.units, 0);

  return NextResponse.json({
    ok: true,
    account: { email: user.email, role: membership.role, workspace: membership.organizations },
    usage: { projects: projects || 0, conversations: conversations || 0, messages: messages || 0, aiMessages, aiResponses },
  });
}
