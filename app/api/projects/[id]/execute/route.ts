import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { executeProjectTask } from "@/lib/ai/execution-service";
import { NextResponse } from "next/server";
import { z } from "zod";

const executeSchema = z.object({
  taskId: z.string().min(1),
});

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

export async function POST(
  request: Request,
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

  const membership = await getUserOrganization(
    session.user.id
  );

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
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
      paymentStatus: true,
      executionUnlocked: true,
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  if (
    project.paymentStatus !== "PAID" ||
    project.executionUnlocked !== true
  ) {
    return NextResponse.json(
      {
        error: "Project execution is locked",
        paymentStatus: project.paymentStatus,
        executionUnlocked: project.executionUnlocked,
      },
      { status: 403 }
    );
  }

  const body = await request.json();

  const parsed = executeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid execution request",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const task = await executeProjectTask(
      membership.organizationId,
      project.id,
      parsed.data.taskId
    );

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Project task execution failed.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
} 
