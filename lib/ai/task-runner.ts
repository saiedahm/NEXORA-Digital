 import { prisma } from "@/lib/db/client";
import { assertTaskExecutionAllowed } from "@/lib/ai/task-execution-gate";
import { buildAgentSystemPrompt } from "@/lib/ai/execution-context";
import {
  getAIProvider,
  ProviderNotConfiguredError,
} from "@/lib/ai/provider";
import { getAIModel } from "@/lib/ai/model-selection";
import { z } from "zod";

const aiTaskOutputSchema = z.object({
  result: z.unknown(),
  summary: z.string().min(1),
});

export async function runAiTask(
  organizationId: string,
  taskId: string,
  complexity: "default" | "complex" = "default"
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

  if (task.status === "IN_PROGRESS") {
    throw new Error("Task is already running.");
  }

  if (task.status === "COMPLETED") {
    throw new Error("Task is already completed.");
  }

  const systemPrompt = buildAgentSystemPrompt(
    task.agent.key
  );

  const model = getAIModel(complexity);

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
        model,
        complexity,
      },
    },
  });

  try {
    const provider = getAIProvider();

    const response = await provider.generate(
      {
        system: systemPrompt,
        user: [
          `Project: ${task.project.name}`,
          `Task: ${task.title}`,
          `Description: ${task.description}`,
          `Input: ${JSON.stringify(task.input ?? {})}`,
          "",
          "Return valid JSON with exactly these fields:",
          "- result: the actual task result",
          "- summary: a concise summary of what was actually completed",
          "",
          "Do not claim completion if the requested work was not actually performed.",
        ].join("\n"),
        model,
      },
      aiTaskOutputSchema
    );

    const completedTask = await prisma.aiTask.update({
      where: {
        id: task.id,
      },
      data: {
        status: "COMPLETED",
        output: response.output,
        completedAt: new Date(),
        tokensUsed: response.usage.totalTokens,
      },
    });

    await prisma.aiUsage.create({
      data: {
        provider:
          process.env.AI_PROVIDER ?? "unknown",
        model: response.usage.model,
        inputTokens: response.usage.inputTokens,
        outputTokens: response.usage.outputTokens,
        totalTokens: response.usage.totalTokens,
        duration: response.usage.durationMs,
        status: "COMPLETED",
        taskId: task.id,
        agentId: task.agentId,
        organizationId,
        projectId: task.projectId,
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
          model: response.usage.model,
          complexity,
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
          model,
          complexity,
        },
      },
    });

    throw error;
  }
}
