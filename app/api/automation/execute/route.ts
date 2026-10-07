import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getContext() {
  const store = await cookies();
  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, organizationId: null };
  const { data: membership } = await supabase.from("memberships").select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
  return { supabase, user, organizationId: membership?.organization_id ?? null };
}

export async function POST(request: Request) {
  let supabase: Awaited<ReturnType<typeof getContext>>["supabase"] | null = null;
  let runId: string | null = null;

  try {
    const body = await request.json();
    const workflowId = typeof body?.workflowId === "string" ? body.workflowId : "";
    const input = typeof body?.input === "string" ? body.input.trim() : "";
    if (!workflowId) return NextResponse.json({ ok: false, error: "Workflow id is required." }, { status: 400 });
    if (!input) return NextResponse.json({ ok: false, error: "Workflow input is required." }, { status: 400 });
    if (input.length > 4000) return NextResponse.json({ ok: false, error: "Workflow input is too long." }, { status: 400 });

    const context = await getContext();
    supabase = context.supabase;
    const { user, organizationId } = context;
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
    if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

    const { data: workflow } = await supabase
      .from("automation_workflows")
      .select("id, project_id, status, definition")
      .eq("id", workflowId)
      .eq("organization_id", organizationId)
      .maybeSingle();

    if (!workflow) return NextResponse.json({ ok: false, error: "Workflow not found." }, { status: 404 });
    if (workflow.status === "archived") return NextResponse.json({ ok: false, error: "Archived workflows cannot run." }, { status: 409 });

    const steps = Array.isArray(workflow.definition?.steps) ? workflow.definition.steps : [];
    const aiStep = steps.find((step: { type?: string; prompt?: string }) => step?.type === "ai_action" && typeof step.prompt === "string" && step.prompt.trim());
    if (!aiStep) return NextResponse.json({ ok: false, error: "This workflow has no configured AI Action." }, { status: 400 });

    const { data: run, error: runInsertError } = await supabase
      .from("automation_runs")
      .insert({
        organization_id: organizationId,
        workflow_id: workflow.id,
        triggered_by: user.id,
        status: "running",
        input,
      })
      .select("id, status, started_at")
      .single();

    if (runInsertError || !run) {
      return NextResponse.json({ ok: false, error: "Could not create automation run history." }, { status: 500 });
    }
    runId = run.id;

    const prompt = aiStep.prompt.trim() + "\n\nWORKFLOW INPUT:\n" + input;
    const cookie = request.headers.get("cookie") || "";
    const aiResponse = await fetch(new URL("/api/ai", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ prompt, projectId: workflow.project_id || null }),
      cache: "no-store",
    });

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      const errorMessage = data?.error || "AI workflow execution failed.";
      await supabase.from("automation_runs").update({
        status: "failed",
        error: errorMessage,
        completed_at: new Date().toISOString(),
      }).eq("id", runId).eq("organization_id", organizationId);
      return NextResponse.json({ ok: false, error: errorMessage, runId }, { status: aiResponse.status });
    }

    const responseText = typeof data.response === "string" ? data.response : "";
    await supabase.from("automation_runs").update({
      status: "completed",
      output: responseText,
      completed_at: new Date().toISOString(),
    }).eq("id", runId).eq("organization_id", organizationId);

    return NextResponse.json({ ok: true, response: responseText, usage: data.usage, runId });
  } catch {
    if (supabase && runId) {
      await supabase.from("automation_runs").update({
        status: "failed",
        error: "Workflow execution failed.",
        completed_at: new Date().toISOString(),
      }).eq("id", runId);
    }
    return NextResponse.json({ ok: false, error: "Workflow execution failed." }, { status: 500 });
  }
}
