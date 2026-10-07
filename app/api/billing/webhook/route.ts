import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function verifySignature(payload: string, signature: string, secret: string) {
  const values = signature.split(",").reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split("=", 2);
    if (key && value) (acc[key] ||= []).push(value);
    return acc;
  }, {});

  const timestamp = Number(values.t?.[0]);
  const signatures = values.v1 || [];
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return signatures.some((value) => {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(value, "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase webhook configuration is incomplete.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret || !verifySignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(payload);
    const object = event?.data?.object;

    if (event.type === "checkout.session.completed") {
      const organizationId = object?.metadata?.organization_id;
      const plan = object?.metadata?.plan;

      if (organizationId && plan) {
        const supabase = getAdminClient();
        const { error } = await supabase.from("subscriptions").upsert({
          organization_id: organizationId,
          plan,
          status: "active",
          stripe_customer_id: typeof object.customer === "string" ? object.customer : null,
          stripe_subscription_id: typeof object.subscription === "string" ? object.subscription : null,
          updated_at: new Date().toISOString(),
        }, { onConflict: "organization_id" });

        if (error) {
          return NextResponse.json({ error: "Subscription update failed." }, { status: 500 });
        }
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscriptionId = object?.id;

      if (typeof subscriptionId === "string") {
        const status = event.type === "customer.subscription.deleted"
          ? "canceled"
          : typeof object.status === "string" ? object.status : "active";

        const currentPeriodEnd = object?.current_period_end
          ? new Date(Number(object.current_period_end) * 1000).toISOString()
          : null;

        const supabase = getAdminClient();
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId);

        if (error) {
          return NextResponse.json({ error: "Subscription update failed." }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Stripe webhook could not be processed." }, { status: 500 });
  }
}
