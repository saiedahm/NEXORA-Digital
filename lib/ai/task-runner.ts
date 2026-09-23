 import { prisma } from "@/lib/db/client";
import { assertTaskExecutionAllowed } from "@/lib/ai/task-execution-gate";
import { getAgentDefinition } from "@/lib/ai/agent-registry";
import { getAIProvider, ProviderNotConfiguredError } from "@/lib/ai/provider";

export async function runAiTask(
  organizationId: string,
  taskId: string
) {
  const task = await prisma.aiTask.findFirst({
    where: {
      id: taskId,
      organizationId,
    },
    include: {
      agent: true,
      project: true,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await assertTaskExecutionAllowed(
    organizationId,
    taskId
  );

  const agentDefinition = getAgentDefinition(task.agent.key);

  if (!agentDefinition) {
    throw new Error(
      `Agent definition not found: ${task.agent.key}`
    );
  }

  await prisma.aiTask.update({
    where: {
      id: task.id,
    },
    data: {
      status: "IN_PROGRESS",
      startedAt: new Date(),
      error: null,
    },
  });

  await prisma.aiActivity.create({
    data: {
      organizationId,
      projectId: task.projectId,
      agentId: task.agentId,
      taskId: task.id,
      eventType: "TASK_STARTED",
      message: `Task "${task.title}" started by ${task.agent.name}.`,
      metadata: {
        taskId: task.id,
        agentId: task.agent.key,
      },
    },
  });

  try {
    const provider = getAIProvider();

    const response = await provider.generate(
      {
        system: [
          `You are ${agentDefinition.name}.`,
          `Role: ${agentDefinition.role}.`,
          `Authorized tools: ${agentDefinition.tools.join(", ")}.`,
          "Follow the NEXORA AI constitution.",
          "Do not claim work was completed unless it was actually completed.",
        ].join("\n"),
        user: [
          `Project: ${task.project.name}`,
          `Task: ${task.title}`,
          `Description: ${task.description}`,
          `Input: ${JSON.stringify(task.input ?? {})}`,
        ].join("\n"),
      },
      // The provider implementation will define the final structured output schema.
      // This temporary schema accepts a structured result without inventing completion.
      {
        parse(value: unknown) {
          return value as {
            result?: unknown;
            summary?: string;
          };
        },
      } as never
    );

    const completedTask = await prisma.aiTask.update({
      where: {
        id: task.id,
      },
      data: {
        status: "COMPLETED",
        output: response.output as object,
        completedAt: new Date(),
        tokensUsed: response.usage.totalTokens,
      },
    });

    await prisma.aiActivity.create({
      data: {
        organizationId,
        projectId: task.projectId,
        agentId: task.agentId,
        taskId: task.id,
        eventType: "TASK_COMPLETED",
        message: `Task "${task.title}" completed.`,
        metadata: {
          taskId: task.id,
          agentId: task.agent.key,
          totalTokens: response.usage.totalTokens,
        },
      },
    });

    return completedTask;
  } catch (error) {
    const message =
      error instanceof ProviderNotConfiguredError
        ? "AI provider is not configured."
        : error instanceof Error
          ? error.message
          : "Unknown AI task execution error.";

    await prisma.aiTask.update({
      where: {
        id: task.id,
      },
      data: {
        status: "FAILED",
        error: message,
        completedAt: new Date(),
      },
    });

    await prisma.aiActivity.create({
      data: {
        organizationId,
        projectId: task.projectId,
        agentId: task.agentId,
        taskId: task.id,
        eventType: "TASK_FAILED",
        message: `Task "${task.title}" failed.`,
        metadata: {
          taskId: task.id,
          agentId: task.agent.key,
          error: message,
        },
      },
    });

    throw error;
  }
}
