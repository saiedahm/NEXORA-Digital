 import { NextResponse } from "next/server";
import { getStripe } from "@/lib/payments/stripe";
import { prisma } from "@/lib/db/client";
import Stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get(
    "stripe-signature"
  );

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 500 }
    );
  }

  const body = await request.text();

  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature." },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        const paymentId =
          session.metadata?.paymentId;

        const projectId =
          session.metadata?.projectId;

        const organizationId =
          session.metadata?.organizationId;

        if (
          !paymentId ||
          !projectId ||
          !organizationId
        ) {
          return NextResponse.json(
            { error: "Missing payment metadata." },
            { status: 400 }
          );
        }

        const payment = await prisma.payment.findFirst({
          where: {
            id: paymentId,
            organizationId,
          },
        });

        if (!payment) {
          return NextResponse.json(
            { error: "Payment not found." },
            { status: 404 }
          );
        }

        await prisma.$transaction([
          prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "PAID",
              stripeCheckoutSessionId:
                session.id,
              stripeCustomerId:
                typeof session.customer === "string"
                  ? session.customer
                  : null,
            },
          }),

          prisma.project.updateMany({
            where: {
              id: projectId,
              organizationId,
            },
            data: {
              paymentStatus: "PAID",
              executionUnlocked: true,
              status: "READY_FOR_AI",
            },
          }),

          prisma.aiActivity.create({
            data: {
              organizationId,
              projectId,
              eventType: "PAYMENT_CONFIRMED",
              message:
                "Stripe payment confirmed. Project execution unlocked.",
              metadata: {
                paymentId: payment.id,
                checkoutSessionId: session.id,
              },
            },
          }),
        ]);

        break;
      }

      case "checkout.session.expired": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        const paymentId =
          session.metadata?.paymentId;

        if (paymentId) {
          await prisma.payment.updateMany({
            where: {
              id: paymentId,
              status: {
                not: "PAID",
              },
            },
            data: {
              status: "EXPIRED",
            },
          });
        }

        break;
      }

      default:
        break;
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook processing error:",
      error
    );

    return NextResponse.json(
      {
        error: "Webhook processing failed.",
      },
      { status: 500 }
    );
  }
}
