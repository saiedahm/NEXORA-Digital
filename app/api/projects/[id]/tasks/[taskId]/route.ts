 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { runAiTask } from "@/lib/ai/task-runner";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
    taskId: string;
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

export async function GET(
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

  const { id, taskId } = await context.params;

  const membership = await getUserOrganization(
    session.user.id
  );

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      projectId: id,
      organizationId: membership.organizationId,
    },
    include: {
      agent: true,
      project: true,
      dependencies: true,
      dependents: true,
    },
  });

  if (!task) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    task,
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

  const { id, taskId } = await context.params;

  const membership = await getUserOrganization(
    session.user.id
  );

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      projectId: id,
      organizationId: membership.organizationId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!task) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  if (
    task.status === "IN_PROGRESS"
  ) {
    return NextResponse.json(
      { error: "Task is already running" },
      { status: 409 }
    );
  }

  if (
    task.status === "COMPLETED"
  ) {
    return NextResponse.json(
      { error: "Task is already completed" },
      { status: 409 }
    );
  }

  try {
    const result = await runAiTask(
      membership.organizationId,
      task.id
    );

    return NextResponse.json({
      success: true,
      task: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to execute AI task.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
