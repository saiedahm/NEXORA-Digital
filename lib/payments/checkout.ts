import { prisma } from "@/lib/db/client";
import { getStripe } from "@/lib/payments/stripe";

type CreateCheckoutInput = {
  organizationId: string;
  projectId: string;
  planId: string;
  customerEmail: string;
};

export async function createProjectCheckout(
  input: CreateCheckoutInput
) {
  const project = await prisma.project.findFirst({
    where: {
      id: input.projectId,
      organizationId: input.organizationId,
    },
    select: {
      id: true,
      name: true,
      paymentStatus: true,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  if (project.paymentStatus === "PAID") {
    throw new Error("Project has already been paid.");
  }

  const plan = await prisma.pricingPlan.findFirst({
    where: {
      id: input.planId,
      active: true,
    },
  });

  if (!plan) {
    throw new Error("Pricing plan not found.");
  }

  if (!plan.monthlyCents) {
    throw new Error(
      "The selected pricing plan does not have a monthly price."
    );
  }

  const stripe = getStripe();

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!appUrl) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is not configured."
    );
  }

  const payment = await prisma.payment.create({
    data: {
      organizationId: input.organizationId,
      amountCents: plan.monthlyCents,
      currency: "eur",
      status: "PENDING",
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `NEXORA DIGITAL — ${plan.name}`,
              description: `Payment for project: ${project.name}`,
            },
            unit_amount: plan.monthlyCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        paymentId: payment.id,
        organizationId: input.organizationId,
        projectId: project.id,
        planId: plan.id,
      },
      success_url:
        `${appUrl}/projects/${project.id}?payment=success`,
      cancel_url:
        `${appUrl}/projects/${project.id}?payment=cancelled`,
    });

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        stripeCheckoutSessionId: session.id,
        status: "PROCESSING",
      },
    });

    return {
      paymentId: payment.id,
      checkoutSessionId: session.id,
      checkoutUrl: session.url,
    };
  } catch (error) {
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: "FAILED",
      },
    });

    throw error;
  }
} 
