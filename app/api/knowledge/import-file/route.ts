import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
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

export async function POST(request: Request) {
  try {
    const supabase = await getClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const { data: membership } = await supabase.from("memberships")
      .select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
    if (!membership) return NextResponse.json({ error: "Workspace not found." }, { status: 403 });

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "A file is required." }, { status: 400 });

    const allowed = new Set([
      "text/plain",
      "text/markdown",
      "text/csv",
      "application/json",
    ]);
    if (!allowed.has(file.type)) {
      return NextResponse.json({ error: "This stage supports TXT, Markdown, CSV and JSON files." }, { status: 415 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Files are limited to 2 MB in this stage." }, { status: 413 });
    }

    const content = (await file.text()).trim();
    if (!content) return NextResponse.json({ error: "The uploaded file is empty." }, { status: 422 });

    const { data, error } = await supabase.from("knowledge_documents").insert({
      organization_id: membership.organization_id,
      title: file.name.slice(0, 200),
      source_type: "file",
      content: content.slice(0, 100000),
      created_by: user.id,
    }).select("id, project_id, title, source_type, source_url, content, created_at, updated_at").single();

    if (error) return NextResponse.json({ error: "Unable to save uploaded knowledge." }, { status: 500 });
    return NextResponse.json({ document: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to import this file." }, { status: 500 });
  }
}
