 import { PrismaClient } from "@prisma/client";
import { AGENTS } from "../lib/ai/agents";

const prisma = new PrismaClient();

const PRICING_PLANS = [
  {
    key: "starter",
    name: "Starter",
    monthlyCents: 9900,
    yearlyCents: 99000,
  },
  {
    key: "business",
    name: "Business",
    monthlyCents: 29900,
    yearlyCents: 299000,
  },
  {
    key: "growth",
    name: "Growth",
    monthlyCents: 69900,
    yearlyCents: 699000,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    monthlyCents: null,
    yearlyCents: null,
  },
];

async function seedAgents() {
  for (const agent of AGENTS) {
    await prisma.aiAgent.upsert({
      where: {
        key: agent.id,
      },

      update: {
        name: agent.name,
        role: agent.role,
        department: agent.role,
        permissions: {
          tools: agent.tools,
        },
        tools: agent.tools,
      },

      create: {
        key: agent.id,
        name: agent.name,
        role: agent.role,
        department: agent.role,
        systemPrompt: `You are ${agent.name}, the NEXORA DIGITAL ${agent.role}. Follow the NEXORA AI constitution and use only authorized tools.`,
        permissions: {
          tools: agent.tools,
        },
        tools: agent.tools,
        status: "OFFLINE",
      },
    });
  }
}

async function seedPricingPlans() {
  for (const plan of PRICING_PLANS) {
    await prisma.pricingPlan.upsert({
      where: {
        key: plan.key,
      },

      update: {
        name: plan.name,
        monthlyCents: plan.monthlyCents,
        yearlyCents: plan.yearlyCents,
        active: true,
      },

      create: {
        key: plan.key,
        name: plan.name,
        monthlyCents: plan.monthlyCents,
        yearlyCents: plan.yearlyCents,
        active: true,
      },
    });
  }
}

async function main() {
  console.log("Starting NEXORA DIGITAL database seed...");

  await seedAgents();

  console.log(
    `Seeded ${AGENTS.length} AI managers.`
  );

  await seedPricingPlans();

  console.log(
    `Seeded ${PRICING_PLANS.length} pricing plans.`
  );

  console.log(
    "NEXORA DIGITAL database seed completed."
  );
}

main()
  .catch((error) => {
    console.error(
      "NEXORA DIGITAL database seed failed:"
    );

    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
