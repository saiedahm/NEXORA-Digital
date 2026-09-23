import { z } from "zod";
import {
  AIProviderRequestError,
  type AIProvider,
  type AIRequest,
  type AIResponse,
} from "@/lib/ai/provider";
import { getAIConfig } from "@/lib/ai/config";

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
    const config = getAIConfig();

    const model = request.model || config.defaultModel;

    const startedAt = Date.now();
    const controller = new AbortController();

    const timeout = setTimeout(
      () => controller.abort(),
      request.timeoutMs ?? 120000
    );

    try {
      const response = await fetch(
        `${config.baseUrl}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
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
          `AI provider request failed (${response.status}): ${errorText}`
        );
      }

      const data = (await response.json()) as OpenAIResponse;

      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new AIProviderRequestError(
          "AI provider returned an empty response."
        );
      }

      let json: unknown;

      try {
        json = JSON.parse(content);
      } catch {
        throw new AIProviderRequestError(
          "AI provider returned invalid JSON."
        );
      }

      const output = schema.parse(json);

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
          "AI provider request timed out."
        );
      }

      if (error instanceof z.ZodError) {
        throw new AIProviderRequestError(
          "AI provider returned data that does not match the required schema."
        );
      }

      throw new AIProviderRequestError(
        error instanceof Error
          ? error.message
          : "Unknown AI provider error."
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
