import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { getStripe } from "@/lib/payments/stripe";
import { NextResponse } from "next/server";

const PRICES: Record<number, Record<number, number>> = {
  1: { 1: 49900, 2: 29900, 3: 29900, 4: 14900 },
  3: { 1: 129900, 2: 79900, 3: 79900, 4: 39900 },
  6: { 1: 239900, 2: 149900, 3: 149900, 4: 74900 },
  12: { 1: 449900, 2: 279900, 3: 279900, 4: 139900 },
};

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const space = Number(body.space);
  const months = Number(body.durationMonths || 1);
  const amountCents = PRICES[months]?.[space];
  if (!amountCents) return NextResponse.json({ error: "Invalid advertising space or duration." }, { status: 400 });

  const membership = await prisma.organizationMember.findFirst({ where: { userId: session.user.id }, orderBy: { id: "asc" }, select: { organizationId: true } });
  if (!membership) return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  const project = await prisma.project.findFirst({ where: { id, organizationId: membership.organizationId, customerId: session.user.id } });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const payment = await prisma.payment.create({ data: { organizationId: membership.organizationId, projectId: project.id, amountCents, currency: "eur", status: "PENDING" } });
  const stripe = getStripe();
  const baseUrl = (process.env.NEXTAUTH_URL || process.env.AUTH_URL || new URL(request.url).origin).replace(/\/$/, "");
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "eur", product_data: { name: `NEXORA Commercial Advertisement — Space ${space} — ${months} month(s)` }, unit_amount: amountCents }, quantity: 1 }],
    metadata: { paymentId: payment.id, projectId: project.id, organizationId: membership.organizationId, type: "COMMERCIAL_AD", space: String(space), durationMonths: String(months) },
    success_url: `${baseUrl}/?payment=success&project=${encodeURIComponent(project.id)}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?payment=cancelled&project=${encodeURIComponent(project.id)}`,
  });
  await prisma.payment.update({ where: { id: payment.id }, data: { stripeCheckoutSessionId: checkout.id, status: "PROCESSING" } });
  return NextResponse.json({ ok: true, url: checkout.url, amountCents });
}
