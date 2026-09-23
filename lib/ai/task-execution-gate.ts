 import { prisma } from "@/lib/db/client";

export async function canExecuteTask(
  organizationId: string,
  taskId: string
): Promise<boolean> {
  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      organizationId,
    },
    select: {
      project: {
        select: {
          paymentStatus: true,
          executionUnlocked: true,
        },
      },
    },
  });

  if (!task?.project) {
    return false;
  }

  return (
    task.project.paymentStatus === "PAID" &&
    task.project.executionUnlocked === true
  );
}

export async function assertTaskExecutionAllowed(
  organizationId: string,
  taskId: string
): Promise<void> {
  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      organizationId,
    },
    select: {
      id: true,
      project: {
        select: {
          paymentStatus: true,
          executionUnlocked: true,
        },
      },
    },
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  if (
    task.project.paymentStatus !== "PAID" ||
    task.project.executionUnlocked !== true
  ) {
    throw new Error(
      "Task execution is locked. Payment must be completed and execution must be unlocked."
    );
  }
}
