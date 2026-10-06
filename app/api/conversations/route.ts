import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

async function getClient() {
  const store = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
}

export async function GET() {
  const supabase = await getClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

  const { data, error } = await supabase
    .from("conversations")
    .select("id, project_id, title, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, conversations: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectId = typeof body?.projectId === "string" ? body.projectId : null;
    const title = typeof body?.title === "string" && body.title.trim() ? body.title.trim().slice(0, 120) : "New AI conversation";

    const supabase = await getClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

    const { data: membership } = await supabase.from("memberships").select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
    if (!membership) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

    if (projectId) {
      const { data: project } = await supabase.from("projects").select("id").eq("id", projectId).eq("organization_id", membership.organization_id).maybeSingle();
      if (!project) return NextResponse.json({ ok: false, error: "Project not found in your workspace." }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("conversations")
      .insert({ organization_id: membership.organization_id, project_id: projectId, user_id: user.id, title })
      .select("id, project_id, title, created_at, updated_at")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, conversation: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Conversation creation failed." }, { status: 500 });
  }
}
