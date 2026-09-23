import { prisma } from "@/lib/db/client";
import { runAiTask } from "@/lib/ai/task-runner";

export async function executeProjectTask(
  organizationId: string,
  projectId: string,
  taskId: string
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId,
    },
    select: {
      id: true,
      paymentStatus: true,
      executionUnlocked: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (
    project.paymentStatus !== "PAID" ||
    project.executionUnlocked !== true
  ) {
    throw new Error(
      "Project execution is locked. Payment must be completed and execution must be unlocked."
    );
  }

  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      projectId: project.id,
      organizationId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.status === "IN_PROGRESS") {
    throw new Error("Task is already running");
  }

  if (task.status === "COMPLETED") {
    throw new Error("Task is already completed");
  }

  return runAiTask(
    organizationId,
    task.id
  );
} 
