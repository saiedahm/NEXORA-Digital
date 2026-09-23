 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { createProjectCheckout } from "@/lib/payments/checkout";
import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  projectId: z.string().min(1),
  planId: z.string().min(1),
});

async function getUserOrganization(userId: string) {
  return prisma.organizationMember.findFirst({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
    select: {
      organizationId: true,
    },
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const membership = await getUserOrganization(
    session.user.id
  );

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found." },
      { status: 404 }
    );
  }

  const body = await request.json();

  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid checkout data.",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id: parsed.data.projectId,
      organizationId: membership.organizationId,
      customerId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found." },
      { status: 404 }
    );
  }

  try {
    const checkout = await createProjectCheckout({
      organizationId: membership.organizationId,
      projectId: project.id,
      planId: parsed.data.planId,
      customerEmail: session.user.email,
    });

    return NextResponse.json(checkout);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}
