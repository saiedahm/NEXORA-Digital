import { getAIConfig } from "@/lib/ai/config";

export type AIModelComplexity =
  | "default"
  | "complex";

export function getAIModel(
  complexity: AIModelComplexity = "default"
): string {
  const config = getAIConfig();

  if (complexity === "complex") {
    return config.complexModel;
  }

  return config.defaultModel;
} 
