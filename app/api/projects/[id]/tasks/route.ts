import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(10000),
  agentId: z.string().min(1),
  priority: z.number().int().min(0).max(100).optional(),
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

  const { id } = await context.params;

  const membership = await getUserOrganization(session.user.id);

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
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  const tasks = await prisma.aiTask.findMany({
    where: {
      projectId: project.id,
      organizationId: membership.organizationId,
    },
    include: {
      agent: true,
    },
    orderBy: [
      {
        priority: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
  });

  return NextResponse.json({
    tasks,
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

  const membership = await getUserOrganization(session.user.id);

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
      executionUnlocked: true,
      paymentStatus: true,
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

  const parsed = createTaskSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid task data",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const agent = await prisma.aiAgent.findUnique({
    where: {
      id: parsed.data.agentId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!agent) {
    return NextResponse.json(
      { error: "AI agent not found" },
      { status: 404 }
    );
  }

  const task = await prisma.aiTask.create({
    data: {
      organizationId: membership.organizationId,
      projectId: project.id,
      agentId: agent.id,
      title: parsed.data.title,
      description: parsed.data.description,
      priority: parsed.data.priority ?? 0,
      status: "QUEUED",
    },
  });

  await prisma.aiActivity.create({
    data: {
      organizationId: membership.organizationId,
      projectId: project.id,
      agentId: agent.id,
      taskId: task.id,
      eventType: "TASK_CREATED",
      message: `AI task "${task.title}" was created.`,
      metadata: {
        taskId: task.id,
        agentId: agent.id,
      },
    },
  });

  return NextResponse.json(
    {
      task,
    },
    { status: 201 }
  );
} 
