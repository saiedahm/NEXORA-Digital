import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { currentUser } from "@/lib/auth/current-user";

function checkoutIsConfigured(role: string) {
  const common = Boolean(process.env.STRIPE_SECRET_KEY);
  if (role === "CANDIDATE") {
    return common &&
      Boolean(process.env.STRIPE_PRICE_CANDIDATE_PRO_MONTHLY) &&
      Boolean(process.env.STRIPE_PRICE_CANDIDATE_PRO_YEARLY);
  }
  if (role === "COMPANY") {
    return common &&
      Boolean(process.env.STRIPE_PRICE_BUSINESS_MONTHLY) &&
      Boolean(process.env.STRIPE_PRICE_BUSINESS_YEARLY);
  }
  return false;
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Login required." }, { status: 401 });
    }

    const subscription = await db.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      select: { plan: true, status: true, currentPeriodEnd: true, provider: true },
    });

    const checkoutConfigured = checkoutIsConfigured(user.role);
    const webhookConfigured = Boolean(process.env.STRIPE_WEBHOOK_SECRET);

    return NextResponse.json({
      userId: user.id,
      role: user.role,
      subscription: subscription || {
        status: "INACTIVE",
        plan: null,
        provider: "stripe",
        currentPeriodEnd: null,
      },
      configured: checkoutConfigured && webhookConfigured,
      checkoutConfigured,
      webhookConfigured,
    });
  } catch (error) {
    console.error("Billing status failed", error);
    return NextResponse.json({ error: "Unable to load billing status." }, { status: 500 });
  }
}
