 import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured."
    );
  }

  stripeClient = new Stripe(secretKey, {
    appInfo: {
      name: "NEXORA DIGITAL",
      version: "1.0.0",
    },
  });

  return stripeClient;
}
