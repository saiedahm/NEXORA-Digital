 import { prisma } from "@/lib/db/client";
import { ensureAgentExists } from "@/lib/ai/agent-service";

type CreateTaskInput = {
  organizationId: string;
  projectId: string;
  agentId: string;
  title: string;
  description: string;
  priority?: number;
  input?: Record<string, unknown>;
};

export async function createAiTask(
  input: CreateTaskInput
) {
  const project = await prisma.project.findFirst({
    where: {
      id: input.projectId,
      organizationId: input.organizationId,
    },
    select: {
      id: true,
      organizationId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  const agent = await ensureAgentExists(
    input.agentId
  );

  const task = await prisma.aiTask.create({
    data: {
      organizationId: input.organizationId,
      projectId: input.projectId,
      agentId: agent.id,
      title: input.title,
      description: input.description,
      priority: input.priority ?? 0,
      status: "QUEUED",
      input: input.input ?? undefined,
    },
  });

  await prisma.aiActivity.create({
    data: {
      organizationId: input.organizationId,
      projectId: input.projectId,
      agentId: agent.id,
      taskId: task.id,
      eventType: "TASK_CREATED",
      message: `Task "${task.title}" was created.`,
      metadata: {
        taskId: task.id,
        agentId: agent.key,
      },
    },
  });

  return task;
}

export async function getProjectTasks(
  organizationId: string,
  projectId: string
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId,
    },
    select: {
      id: true,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  return prisma.aiTask.findMany({
    where: {
      organizationId,
      projectId: project.id,
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
}

export async function getTaskById(
  organizationId: string,
  taskId: string
) {
  return prisma.aiTask.findFirst({
    where: {
      id: taskId,
      organizationId,
    },
    include: {
      agent: true,
      project: true,
      dependencies: true,
      dependents: true,
    },
  });
}

export async function updateTaskStatus(
  organizationId: string,
  taskId: string,
  status:
    | "QUEUED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "NEEDS_APPROVAL"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
) {
  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      organizationId,
    },
    include: {
      project: true,
    },
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  const now = new Date();

  const updatedTask = await prisma.aiTask.update({
    where: {
      id: task.id,
    },
    data: {
      status,
      startedAt:
        status === "IN_PROGRESS" && !task.startedAt
          ? now
          : task.startedAt,
      completedAt:
        status === "COMPLETED" ||
        status === "FAILED"
          ? now
          : task.completedAt,
    },
  });

  await prisma.aiActivity.create({
    data: {
      organizationId,
      projectId: task.projectId,
      agentId: task.agentId,
      taskId: task.id,
      eventType: "TASK_STATUS_CHANGED",
      message: `Task "${task.title}" changed to ${status}.`,
      metadata: {
        taskId: task.id,
        status,
      },
    },
  });

  return updatedTask;
}
