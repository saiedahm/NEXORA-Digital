import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

async function getClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    }
  );
}

async function ensureWorkspace(supabase: Awaited<ReturnType<typeof getClient>>, userId: string, email: string | null) {
  const { data: membership } = await supabase
    .from("memberships")
    .select("organization_id, organizations(id, name, slug)")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (membership) return membership;

  const base = (email?.split("@")[0] || "workspace").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "workspace";
  const slug = `${base}-${userId.slice(0, 8)}`;
  const { data: organization, error: orgError } = await supabase
    .from("organizations")
    .insert({ name: email ? `${email.split("@")[0]}'s Workspace` : "NEXORA Workspace", slug })
    .select("id, name, slug")
    .single();

  if (orgError) throw orgError;

  const { error: membershipError } = await supabase
    .from("memberships")
    .insert({ organization_id: organization.id, user_id: userId, role: "owner" });

  if (membershipError) throw membershipError;

  return { organization_id: organization.id, organizations: organization };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body?.action;
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (!["login", "signup", "logout"].includes(action)) {
      return NextResponse.json({ ok: false, error: "Invalid authentication action." }, { status: 400 });
    }

    const supabase = await getClient();

    if (action === "logout") {
      const { error } = await supabase.auth.signOut();
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true, message: "Signed out." });
    }

    if (!email || !password) return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ ok: false, error: "Password must be at least 8 characters." }, { status: 400 });

    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: name || null } },
      });
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      if (!data.session || !data.user) {
        return NextResponse.json({ ok: true, authenticated: false, needsConfirmation: true, message: "Account created. Please check your email to confirm your account." });
      }
      try {
        const workspace = await ensureWorkspace(supabase, data.user.id, data.user.email ?? email);
        return NextResponse.json({ ok: true, authenticated: true, workspace, message: "Account created and workspace ready." });
      } catch (workspaceError) {
        return NextResponse.json({ ok: false, error: workspaceError instanceof Error ? workspaceError.message : "Workspace creation failed." }, { status: 500 });
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return NextResponse.json({ ok: false, error: error?.message || "Sign in failed." }, { status: 401 });

    const workspace = await ensureWorkspace(supabase, data.user.id, data.user.email ?? email);
    return NextResponse.json({ ok: true, authenticated: true, workspace, message: "Signed in successfully." });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Authentication service is unavailable." }, { status: 500 });
  }
}
