import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/payments/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized payment core request." }, { status: 401 });
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    if (!sessionId) return NextResponse.json({ error: "sessionId is required." }, { status: 400 });

    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      ok: true,
      paid: session.payment_status === "paid",
      status: session.status,
      customerId: typeof session.customer === "string" ? session.customer : null,
      subscriptionId: typeof session.subscription === "string" ? session.subscription : null,
      metadata: session.metadata || {},
    });
  } catch (error) {
    console.error("Payment Core session status error:", error);
    return NextResponse.json({ error: "Unable to verify payment session." }, { status: 502 });
  }
}
