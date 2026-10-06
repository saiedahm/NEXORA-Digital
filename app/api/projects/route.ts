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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const description = typeof body?.description === "string" ? body.description.trim() : "";

    if (!name || name.length > 100) {
      return NextResponse.json({ ok: false, error: "Project name is required and must be under 100 characters." }, { status: 400 });
    }

    const supabase = await client();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });

    const { data: membership, error: membershipError } = await supabase
      .from("memberships")
      .select("organization_id, role")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (membershipError || !membership) {
      return NextResponse.json({ ok: false, error: "No NEXORA workspace is attached to this account." }, { status: 403 });
    }

    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        organization_id: membership.organization_id,
        name,
        description: description || null,
        created_by: user.id,
      })
      .select("id, name, description, created_at, updated_at")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true, project });
  } catch {
    return NextResponse.json({ ok: false, error: "Project creation failed." }, { status: 500 });
  }
}
