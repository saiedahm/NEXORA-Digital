import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function requestCookies(request: Request) {
  const raw = request.headers.get("cookie") || "";
  return raw.split(";").map((part) => {
    const [name, ...value] = part.trim().split("=");
    return { name, value: value.join("=") };
  }).filter((item) => item.name);
}

function makeClient(request: Request, pending: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => requestCookies(request),
      setAll: (items) => pending.push(...items),
    },
  });
}

function json(body: unknown, status: number, pending: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
  const response = NextResponse.json(body, { status });
  for (const cookie of pending) response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

async function ensureWorkspace(supabase: ReturnType<typeof makeClient>, userId: string, email: string | null) {
  const { data: membership } = await supabase.from("memberships").select("organization_id").eq("user_id", userId).limit(1).maybeSingle();
  if (membership) return membership;

  const base = (email?.split("@")[0] || "workspace").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "workspace";
  const slug = `${base}-${userId.slice(0, 8)}`;

  const { data: organization, error } = await supabase.from("organizations")
    .insert({ name: email ? `${email.split("@")[0]}'s Workspace` : "NEXORA Workspace", slug })
    .select("id, name, slug").single();
  if (error) throw error;

  const { error: membershipError } = await supabase.from("memberships")
    .insert({ organization_id: organization.id, user_id: userId, role: "owner" });
  if (membershipError) throw membershipError;
  return { organization_id: organization.id };
}

export async function POST(request: Request) {
  const pending: Array<{ name: string; value: string; options?: Record<string, unknown> }> = [];
  try {
    const body = await request.json();
    const action = body?.action;
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (action === "logout") {
      const supabase = makeClient(request, pending);
      await supabase.auth.signOut();
      return json({ ok: true }, 200, pending);
    }

    if (!["login", "signup"].includes(action)) return json({ ok: false, error: "Invalid authentication action." }, 400, pending);
    if (!email || !password) return json({ ok: false, error: "Email and password are required." }, 400, pending);
    if (password.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);

    const supabase = makeClient(request, pending);
    const result = action === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: name || null } } });

    if (result.error) return json({ ok: false, error: result.error.message }, 401);
    if (!result.data.user) return json({ ok: false, error: "Authentication failed." }, 401);

    if (!result.data.session) {
      return json({ ok: true, authenticated: false, needsConfirmation: true, message: "Account created. Please check your email to confirm your account." }, 200, pending);
    }

    const workspace = await ensureWorkspace(supabase, result.data.user.id, result.data.user.email ?? email);
    return json({ ok: true, authenticated: true, workspace, message: "Signed in successfully." }, 200, pending);
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Authentication service is unavailable." }, 500, pending);
  }
}
