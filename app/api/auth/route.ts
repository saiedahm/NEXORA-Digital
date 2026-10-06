import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function createSupabaseResponse() {
  const response = NextResponse.next();
  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body?.action;
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (action !== "login" && action !== "signup" && action !== "logout") {
      return NextResponse.json({ ok: false, error: "Invalid authentication action." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const response = createSupabaseResponse();

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    if (action === "logout") {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true, message: "Signed out." });
    }

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ ok: false, error: "Password must be at least 8 characters." }, { status: 400 });
    }

    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name || null },
        },
      });

      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }

      const needsConfirmation = !data.session;
      return NextResponse.json(
        {
          ok: true,
          authenticated: Boolean(data.session),
          needsConfirmation,
          message: needsConfirmation
            ? "Account created. Please check your email to confirm your account."
            : "Account created and signed in.",
        },
        { headers: response.headers }
      );
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { ok: true, authenticated: true, message: "Signed in successfully." },
      { headers: response.headers }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Authentication service is unavailable." }, { status: 500 });
  }
}
