export const NEXORA_FREE_PLAN = {
  key: "free",
  name: "Free",
  price: "€0",
  period: "/ month",
  aiLimit: 20,
} as const;

export const NEXORA_PLANS = [
  {
    key: "starter",
    name: "Starter",
    price: "€99",
    period: "/ month",
    text: "For individuals starting a serious digital project.",
    features: ["AI Studio access", "Digital workspace", "Core automation"],
    aiLimit: 200,
    featured: false,
  },
  {
    key: "business",
    name: "Business",
    price: "€299",
    period: "/ month",
    text: "For businesses that want connected digital workflows.",
    features: ["Everything in Starter", "Advanced AI workflows", "Business workspace", "Priority support"],
    aiLimit: 1000,
    featured: true,
  },
  {
    key: "growth",
    name: "Growth",
    price: "€699",
    period: "/ month",
    text: "For growing teams building a larger digital operation.",
    features: ["Everything in Business", "Expanded automation", "Scalable workspace", "Growth support"],
    aiLimit: 5000,
    featured: false,
  },
] as const;

export const NEXORA_ENTERPRISE = {
  key: "enterprise",
  name: "Enterprise",
  price: "Custom",
  period: "",
  aiLimit: null,
} as const;
