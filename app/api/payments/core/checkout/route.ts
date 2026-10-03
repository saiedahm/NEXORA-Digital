import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/payments/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLATFORMS = {
  "help-me": {
    origin: "https://help-me-nu-sooty.vercel.app",
    products: {
      member: { mode: "subscription", monthly: 499, yearly: 5988, name: "HELP-ME Membership" },
      starter: { mode: "subscription", monthly: 1900, yearly: 19000, name: "HELP-ME Starter" },
      pro: { mode: "subscription", monthly: 4900, yearly: 49000, name: "HELP-ME Pro" },
      business: { mode: "subscription", monthly: 14900, yearly: 149000, name: "HELP-ME Business" },
    },
  },
  sakan: {
    origin: "https://sakanapp.net",
    products: {
      GOLD: { mode: "payment", amount: 1900, currency: "usd", name: "Sakan Gold Membership" },
      VIP: { mode: "payment", amount: 3900, currency: "usd", name: "Sakan VIP Membership" },
      AD_99_CENTS: { mode: "payment", amount: 99, currency: "usd", name: "Sakan Banner Advertisement — 5 minutes" },
    },
  },
} as const;

function authorized(request: Request) {
  const configured = process.env.PAYMENT_CORE_SECRET?.trim();
  const header = request.headers.get("authorization") || "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!configured || !supplied) return false;

  const a = Buffer.from(configured);
  const b = Buffer.from(supplied);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized payment core request." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const platform = typeof body?.platform === "string" ? body.platform : "";
    const product = typeof body?.product === "string" ? body.product : "";
    const interval = body?.interval === "year" ? "year" : "month";
    const externalUserId = typeof body?.externalUserId === "string" ? body.externalUserId.slice(0, 120) : "";
    const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail.slice(0, 320) : "";

    const config = PLATFORMS[platform as keyof typeof PLATFORMS];
    if (!config) {
      return NextResponse.json({ error: "Unsupported payment platform." }, { status: 400 });
    }

    const item = config.products[product as keyof typeof config.products];
    if (!item) {
      return NextResponse.json({ error: "Unsupported payment product." }, { status: 400 });
    }

    const stripe = getStripe();
    const origin = config.origin.replace(/\/$/, "");
    const successPath = platform === "sakan" ? "/frontend/pages/pricing.html" : "/";
    const metadata = {
      platform,
      product,
      interval,
      ...(externalUserId ? { externalUserId } : {}),
    };

    const lineItem =
      item.mode === "subscription"
        ? {
            price_data: {
              currency: "eur",
              product_data: { name: item.name },
              unit_amount: interval === "year" ? item.yearly : item.monthly,
              recurring: { interval: interval === "year" ? "year" as const : "month" as const },
            },
            quantity: 1,
          }
        : {
            price_data: {
              currency: item.currency,
              product_data: { name: item.name },
              unit_amount: item.amount,
            },
            quantity: 1,
          };

    const session = await stripe.checkout.sessions.create({
      mode: item.mode,
      line_items: [lineItem],
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata,
      success_url: `${origin}${successPath}?payment=success&platform=${encodeURIComponent(platform)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled&platform=${encodeURIComponent(platform)}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      ok: true,
      url: session.url,
      sessionId: session.id,
      platform,
      product,
      interval,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment checkout could not be created.";
    console.error("Central Stripe Payment Core error:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
