import { z } from "zod";
import { OpenAIProvider } from "@/lib/ai/providers/openai";

export type AIRequest = {
  system: string;
  user: string;
  model?: string;
  timeoutMs?: number;
};

export type AIUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  durationMs: number;
  model: string;
};

export type AIResponse<T> = {
  output: T;
  usage: AIUsage;
};

export interface AIProvider {
  generate<T>(
    request: AIRequest,
    schema: z.ZodType<T>
  ): Promise<AIResponse<T>>;
}

export class ProviderNotConfiguredError extends Error {
  constructor(message = "AI provider is not configured") {
    super(message);
    this.name = "ProviderNotConfiguredError";
  }
}

export class AIProviderRequestError extends Error {
  constructor(message = "AI provider request failed") {
    super(message);
    this.name = "AIProviderRequestError";
  }
}

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER
    ?.trim()
    .toLowerCase();

  if (!provider) {
    throw new ProviderNotConfiguredError(
      "AI_PROVIDER is not configured."
    );
  }

  switch (provider) {
    case "openai":
      return new OpenAIProvider();

    default:
      throw new ProviderNotConfiguredError(
        `Unsupported AI provider: ${provider}`
      );
  }
}
