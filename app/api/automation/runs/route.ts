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

export async function GET(request: Request) {
  try {
    const { supabase, user, organizationId } = await getContext();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
    if (!organizationId) return NextResponse.json({ ok: false, error: "Workspace not found." }, { status: 403 });

    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflow_id");

    let query = supabase
      .from("automation_runs")
      .select("id, workflow_id, status, input, output, error, started_at, completed_at")
      .eq("organization_id", organizationId)
      .order("started_at", { ascending: false })
      .limit(50);

    if (workflowId) query = query.eq("workflow_id", workflowId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ ok: false, error: "Could not load automation run history." }, { status: 500 });

    return NextResponse.json({ ok: true, runs: data ?? [] });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not load automation run history." }, { status: 500 });
  }
}
