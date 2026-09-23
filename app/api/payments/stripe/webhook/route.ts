 import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/db/client";
import { getStripe } from "@/lib/payments/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "Missing Stripe signature.",
      },
      {
        status: 400,
      }
    );
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not configured.",
      },
      {
        status: 500,
      }
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
      {
        error: "Invalid Stripe webhook signature.",
      },
      {
        status: 400,
      }
    );
  }

  const existingEvent =
    await prisma.stripeWebhookEvent.findUnique({
      where: {
        eventId: event.id,
      },
    });

  if (existingEvent?.processed) {
    return NextResponse.json({
      received: true,
      duplicate: true,
    });
  }

  if (!existingEvent) {
    await prisma.stripeWebhookEvent.create({
      data: {
        eventId: event.id,
        eventType: event.type,
        processed: false,
      },
    });
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
          throw new Error(
            "Missing payment metadata."
          );
        }

        if (session.payment_status !== "paid") {
          await prisma.payment.updateMany({
            where: {
              id: paymentId,
              organizationId,
            },
            data: {
              status: "PROCESSING",
            },
          });

          return NextResponse.json({
            received: true,
            paymentConfirmed: false,
          });
        }

        const payment =
          await prisma.payment.findFirst({
            where: {
              id: paymentId,
              organizationId,
              projectId,
            },
          });

        if (!payment) {
          throw new Error(
            "Payment not found."
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
                typeof session.customer ===
                "string"
                  ? session.customer
                  : null,
              stripeSubscriptionId:
                typeof session.subscription ===
                "string"
                  ? session.subscription
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
                subscriptionId:
                  typeof session.subscription ===
                  "string"
                    ? session.subscription
                    : null,
              },
            },
          }),

          prisma.stripeWebhookEvent.update({
            where: {
              eventId: event.id,
            },
            data: {
              processed: true,
              processedAt: new Date(),
              error: null,
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

        await prisma.stripeWebhookEvent.update({
          where: {
            eventId: event.id,
          },
          data: {
            processed: true,
            processedAt: new Date(),
            error: null,
          },
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice =
          event.data.object as Stripe.Invoice;

        const subscriptionId =
          typeof invoice.subscription ===
          "string"
            ? invoice.subscription
            : null;

        if (subscriptionId) {
          await prisma.payment.updateMany({
            where: {
              stripeSubscriptionId:
                subscriptionId,
              status: "PAID",
            },
            data: {
              status: "FAILED",
            },
          });
        }

        await prisma.stripeWebhookEvent.update({
          where: {
            eventId: event.id,
          },
          data: {
            processed: true,
            processedAt: new Date(),
            error: null,
          },
        });

        break;
      }

      default: {
        await prisma.stripeWebhookEvent.update({
          where: {
            eventId: event.id,
          },
          data: {
            processed: true,
            processedAt: new Date(),
            error: null,
          },
        });
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Webhook processing failed.";

    await prisma.stripeWebhookEvent.update({
      where: {
        eventId: event.id,
      },
      data: {
        processed: false,
        error: message,
      },
    });

    console.error(
      "Stripe webhook processing error:",
      error
    );

    return NextResponse.json(
      {
        error: "Webhook processing failed.",
      },
      {
        status: 500,
      }
    );
  }
}
