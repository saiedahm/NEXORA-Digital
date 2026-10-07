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
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data: membership } = await supabase.from("memberships")
    .select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
  if (!membership) return NextResponse.json({ error: "Workspace not found." }, { status: 403 });

  const { data, error } = await supabase.from("knowledge_documents")
    .select("id, project_id, title, source_type, source_url, content, created_at, updated_at")
    .eq("organization_id", membership.organization_id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Unable to load knowledge base." }, { status: 500 });
  return NextResponse.json({ documents: data || [] });
}

export async function POST(request: Request) {
  const supabase = await getClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data: membership } = await supabase.from("memberships")
    .select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
  if (!membership) return NextResponse.json({ error: "Workspace not found." }, { status: 403 });

  const body = await request.json();
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const sourceType = typeof body?.source_type === "string" ? body.source_type : "text";
  const projectId = typeof body?.project_id === "string" ? body.project_id : null;

  if (!title || !content) return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  if (!["text", "url", "file", "qa"].includes(sourceType)) return NextResponse.json({ error: "Invalid source type." }, { status: 400 });
  if (content.length > 100000) return NextResponse.json({ error: "Knowledge content is too large." }, { status: 400 });

  if (projectId) {
    const { data: project } = await supabase.from("projects").select("id")
      .eq("id", projectId).eq("organization_id", membership.organization_id).maybeSingle();
    if (!project) return NextResponse.json({ error: "Project not found in your workspace." }, { status: 403 });
  }

  const { data, error } = await supabase.from("knowledge_documents").insert({
    organization_id: membership.organization_id,
    project_id: projectId,
    title,
    source_type: sourceType,
    source_url: typeof body?.source_url === "string" ? body.source_url.trim() : null,
    content,
    created_by: user.id,
  }).select("id, project_id, title, source_type, source_url, content, created_at, updated_at").single();

  if (error) return NextResponse.json({ error: "Unable to save knowledge document." }, { status: 500 });
  return NextResponse.json({ document: data }, { status: 201 });
}
