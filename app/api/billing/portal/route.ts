import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

async function getSupabase() {
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
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

    const { data: membership } = await supabase
      .from("memberships")
      .select("organization_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!membership) return NextResponse.json({ error: "Your NEXORA workspace was not found." }, { status: 403 });

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("organization_id", membership.organization_id)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: "No active Stripe billing profile was found." }, { status: 404 });
    }

    const form = new URLSearchParams();
    form.set("customer", subscription.stripe_customer_id);
    form.set("return_url", `${new URL(request.url).origin}/account-dashboard`);

    const response = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok || !data?.url) {
      return NextResponse.json({ error: "Stripe could not open billing management." }, { status: 502 });
    }

    return NextResponse.json({ url: data.url });
  } catch {
    return NextResponse.json({ error: "Unable to open billing management." }, { status: 500 });
  }
}
