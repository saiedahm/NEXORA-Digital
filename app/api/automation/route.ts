import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function client() {
  const store = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
}

async function getContext() {
  const supabase = await client();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, organizationId: null };

  const { data: membership } = await supabase
    .from("memberships")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  return { supabase, user, organizationId: membership?.organization_id ?? null };
}

export async function GET(request: Request) {
  const { supabase, user, organizationId } = await getContext();
  if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

  const projectId = new URL(request.url).searchParams.get("project_id");

  let query = supabase
    .from("automation_workflows")
    .select("id, project_id, name, description, status, trigger_type, definition, created_at, updated_at")
    .eq("organization_id", organizationId)
    .order("updated_at", { ascending: false });

  if (projectId) query = query.eq("project_id", projectId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true, workflows: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const description = typeof body?.description === "string" ? body.description.trim() : "";
    const projectId = typeof body?.projectId === "string" ? body.projectId : null;
    const triggerType = ["manual", "schedule", "webhook", "event"].includes(body?.triggerType) ? body.triggerType : "manual";
    const definition = body?.definition && typeof body.definition === "object" && !Array.isArray(body.definition) ? body.definition : {};

    if (!name || name.length > 120) {
      return NextResponse.json({ ok: false, error: "Workflow name is required and must be under 120 characters." }, { status: 400 });
    }

    const { supabase, user, organizationId } = await getContext();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
    if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

    if (projectId) {
      const { data: project } = await supabase
        .from("projects")
        .select("id")
        .eq("id", projectId)
        .eq("organization_id", organizationId)
        .maybeSingle();

      if (!project) return NextResponse.json({ ok: false, error: "Project not found in your workspace." }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("automation_workflows")
      .insert({
        organization_id: organizationId,
        project_id: projectId,
        created_by: user.id,
        name,
        description: description || null,
        trigger_type: triggerType,
        definition,
      })
      .select("id, project_id, name, description, status, trigger_type, definition, created_at, updated_at")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, workflow: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Workflow creation failed." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const workflowId = typeof body?.workflowId === "string" ? body.workflowId : "";
    if (!workflowId) return NextResponse.json({ ok: false, error: "Workflow id is required." }, { status: 400 });

    const { supabase, user, organizationId } = await getContext();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
    if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

    const updates: Record<string, unknown> = {};
    if (typeof body?.name === "string" && body.name.trim()) updates.name = body.name.trim().slice(0, 120);
    if (typeof body?.description === "string") updates.description = body.description.trim() || null;
    if (["draft", "active", "paused", "archived"].includes(body?.status)) updates.status = body.status;
    if (["manual", "schedule", "webhook", "event"].includes(body?.triggerType)) updates.trigger_type = body.triggerType;
    if (body?.definition && typeof body.definition === "object" && !Array.isArray(body.definition)) updates.definition = body.definition;

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("automation_workflows")
      .update(updates)
      .eq("id", workflowId)
      .eq("organization_id", organizationId)
      .select("id, project_id, name, description, status, trigger_type, definition, created_at, updated_at")
      .maybeSingle();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    if (!data) return NextResponse.json({ ok: false, error: "Workflow not found." }, { status: 404 });

    return NextResponse.json({ ok: true, workflow: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Workflow update failed." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const workflowId = new URL(request.url).searchParams.get("id");
  if (!workflowId) return NextResponse.json({ ok: false, error: "Workflow id is required." }, { status: 400 });

  const { supabase, user, organizationId } = await getContext();
  if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

  const { data, error } = await supabase
    .from("automation_workflows")
    .delete()
    .eq("id", workflowId)
    .eq("organization_id", organizationId)
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  if (!data) return NextResponse.json({ ok: false, error: "Workflow not found." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
