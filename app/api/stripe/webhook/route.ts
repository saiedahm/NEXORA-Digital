import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifyStripeSignature(payload: string, header: string, secret: string) {
  const parts = header.split(",").reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split("=", 2);
    if (key && value) (acc[key] ??= []).push(value);
    return acc;
  }, {});
  const timestamp = parts.t?.[0];
  const signatures = parts.v1 ?? [];
  if (!timestamp || signatures.length === 0) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest();
  return signatures.some((signature) => {
    try {
      const received = Buffer.from(signature, "hex");
      return received.length === expected.length && timingSafeEqual(received, expected);
    } catch {
      return false;
    }
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();
  if (!verifyStripeSignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  let event: {
    id: string;
    type: string;
    data: { object: Record<string, unknown> };
  };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid event payload." }, { status: 400 });
  }

  try {
    // Do not mark an event as processed before its database work succeeds.
    // Otherwise a transient failure would make Stripe retries look like duplicates.

    const object = event.data.object;
    const metadata = object.metadata as Record<string, string> | undefined;
    const userId = metadata?.userId;
    const plan = metadata?.plan;
    const subscriptionId = typeof object.subscription === "string" ? object.subscription :
      typeof object.id === "string" && object.object === "subscription" ? object.id : null;
    const customerId = typeof object.customer === "string" ? object.customer : null;

    if (event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded") {
      if (object.mode !== "subscription" || object.payment_status !== "paid" || !userId ||
          !plan || !subscriptionId) {
        return NextResponse.json({ received: true, ignored: true });
      }
      const user = await db.user.findUnique({ where: { id: userId }, select: { id: true, role: true } });
      const validPlan = user?.role === "CANDIDATE"
        ? plan === "CANDIDATE_PRO_MONTHLY" || plan === "CANDIDATE_PRO_YEARLY"
        : user?.role === "COMPANY"
          ? plan === "BUSINESS_MONTHLY" || plan === "BUSINESS_YEARLY"
          : false;
      if (!user || !validPlan) {
        return NextResponse.json({ error: "Checkout metadata does not match an eligible user." }, { status: 400 });
      }
      await db.subscription.upsert({
        where: { providerSubscriptionId: subscriptionId },
        create: {
          userId, provider: "stripe", providerCustomerId: customerId,
          providerSubscriptionId: subscriptionId, plan, status: "ACTIVE",
        },
        update: {
          userId, providerCustomerId: customerId, plan, status: "ACTIVE",
        },
      });
    } else if (event.type === "customer.subscription.created" ||
               event.type === "customer.subscription.updated" ||
               event.type === "customer.subscription.deleted") {
      if (!subscriptionId) return NextResponse.json({ received: true, ignored: true });
      const statusValue = event.type === "customer.subscription.deleted"
        ? "CANCELED"
        : String(object.status ?? "INCOMPLETE").toUpperCase();
      const periodEnd = typeof object.current_period_end === "number"
        ? new Date(object.current_period_end * 1000) : null;
      const existing = await db.subscription.findUnique({
        where: { providerSubscriptionId: subscriptionId },
      });
      if (existing) {
        await db.subscription.update({
          where: { providerSubscriptionId: subscriptionId },
          data: { status: statusValue, currentPeriodEnd: periodEnd, providerCustomerId: customerId ?? existing.providerCustomerId },
        });
      } else if (userId && plan && (statusValue === "ACTIVE" || statusValue === "TRIALING")) {
        await db.subscription.create({
          data: {
            userId, provider: "stripe", providerCustomerId: customerId,
            providerSubscriptionId: subscriptionId, plan, status: statusValue,
            currentPeriodEnd: periodEnd,
          },
        });
      }
    } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
      if (subscriptionId) {
        await db.subscription.updateMany({
          where: { providerSubscriptionId: subscriptionId },
          data: { status: event.type === "invoice.paid" ? "ACTIVE" : "PAST_DUE" },
        });
      }
    } else if (event.type === "checkout.session.async_payment_failed") {
      // An asynchronous checkout payment failed: never grant access for it.
      // If a subscription record was already created, make it non-active.
      if (subscriptionId) {
        await db.subscription.updateMany({
          where: { providerSubscriptionId: subscriptionId },
          data: { status: "PAST_DUE" },
        });
      }
    }

    try {
      await db.billingEvent.create({
        data: { provider: "stripe", providerEventId: event.id, eventType: event.type },
      });
    } catch (error: unknown) {
      // Another delivery may have completed this same event concurrently.
      if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
        return NextResponse.json({ received: true, duplicate: true });
      }
      throw error;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
