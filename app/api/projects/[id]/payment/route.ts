import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  const membership =
    await prisma.organizationMember.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "asc",
      },
      select: {
        organizationId: true,
      },
    });

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found." },
      { status: 404 }
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      organizationId: membership.organizationId,
      customerId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      status: true,
      paymentStatus: true,
      executionUnlocked: true,
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found." },
      { status: 404 }
    );
  }

  const payments = await prisma.payment.findMany({
    where: {
      organizationId: membership.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    select: {
      id: true,
      amountCents: true,
      currency: true,
      status: true,
      stripeCheckoutSessionId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({
    project,
    payments,
  });
} 
