import { z } from "zod";
import {
  AIProviderRequestError,
  type AIProvider,
  type AIRequest,
  type AIResponse,
} from "@/lib/ai/provider";

type OpenAIResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
};

export class OpenAIProvider implements AIProvider {
  async generate<T>(
    request: AIRequest,
    schema: z.ZodType<T>
  ): Promise<AIResponse<T>> {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      throw new AIProviderRequestError(
        "AI_API_KEY is not configured."
      );
    }

    const model =
      request.model ||
      process.env.AI_MODEL_DEFAULT ||
      "gpt-5";

    const startedAt = Date.now();

    const controller = new AbortController();

    const timeout = setTimeout(
      () => controller.abort(),
      request.timeoutMs ?? 120000
    );

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content: request.system,
              },
              {
                role: "user",
                content: request.user,
              },
            ],
            response_format: {
              type: "json_object",
            },
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new AIProviderRequestError(
          `OpenAI request failed (${response.status}): ${errorText}`
        );
      }

      const data =
        (await response.json()) as OpenAIResponse;

      const content =
        data.choices?.[0]?.message?.content;

      if (!content) {
        throw new AIProviderRequestError(
          "OpenAI returned an empty response."
        );
      }

      let parsedJson: unknown;

      try {
        parsedJson = JSON.parse(content);
      } catch {
        throw new AIProviderRequestError(
          "OpenAI returned invalid JSON."
        );
      }

      const output = schema.parse(parsedJson);

      const inputTokens =
        data.usage?.prompt_tokens ?? 0;

      const outputTokens =
        data.usage?.completion_tokens ?? 0;

      const totalTokens =
        data.usage?.total_tokens ??
        inputTokens + outputTokens;

      return {
        output,
        usage: {
          inputTokens,
          outputTokens,
          totalTokens,
          durationMs: Date.now() - startedAt,
          model,
        },
      };
    } catch (error) {
      if (error instanceof AIProviderRequestError) {
        throw error;
      }

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        throw new AIProviderRequestError(
          "OpenAI request timed out."
        );
      }

      throw new AIProviderRequestError(
        error instanceof Error
          ? error.message
          : "Unknown OpenAI provider error."
      );
    } finally {
      clearTimeout(timeout);
    }
  }
} 
