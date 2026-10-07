import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NEXORA_PLANS } from "@/lib/plans";

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

function priceIdForPlan(plan: string) {
  const ids: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    business: process.env.STRIPE_PRICE_BUSINESS,
    growth: process.env.STRIPE_PRICE_GROWTH,
  };
  return ids[plan];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = typeof body?.plan === "string" ? body.plan : "";
    if (!NEXORA_PLANS.some((item) => item.key === plan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    const price = priceIdForPlan(plan);
    if (!secret || !price) {
      return NextResponse.json({ error: "Billing is not configured yet." }, { status: 503 });
    }

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in before choosing a paid plan." }, { status: 401 });

    const { data: membership } = await supabase
      .from("memberships")
      .select("organization_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!membership) return NextResponse.json({ error: "Your NEXORA workspace was not found." }, { status: 403 });

    const origin = new URL(request.url).origin;
    const form = new URLSearchParams();
    form.set("mode", "subscription");
    form.set("line_items[0][price]", price);
    form.set("line_items[0][quantity]", "1");
    form.set("success_url", `${origin}/account-dashboard?billing=success`);
    form.set("cancel_url", `${origin}/pricing?billing=canceled`);
    form.set("customer_email", user.email || "");
    form.set("client_reference_id", membership.organization_id);
    form.set("metadata[organization_id]", membership.organization_id);
    form.set("metadata[plan]", plan);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
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
      return NextResponse.json({ error: "Stripe could not create the checkout session." }, { status: 502 });
    }

    return NextResponse.json({ url: data.url });
  } catch {
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}
