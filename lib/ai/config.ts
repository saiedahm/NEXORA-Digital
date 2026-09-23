export type AIConfig = {
  provider: string;
  apiKey: string;
  baseUrl: string;
  defaultModel: string;
  complexModel: string;
};

export function getAIConfig(): AIConfig {
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase();
  const apiKey = process.env.AI_API_KEY?.trim();

  if (!provider) {
    throw new Error("AI_PROVIDER is not configured.");
  }

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured.");
  }

  const baseUrl =
    process.env.AI_API_BASE_URL?.trim() ||
    "https://api.openai.com/v1";

  const defaultModel =
    process.env.AI_MODEL_DEFAULT?.trim();

  const complexModel =
    process.env.AI_MODEL_COMPLEX?.trim();

  if (!defaultModel) {
    throw new Error("AI_MODEL_DEFAULT is not configured.");
  }

  if (!complexModel) {
    throw new Error("AI_MODEL_COMPLEX is not configured.");
  }

  return {
    provider,
    apiKey,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    defaultModel,
    complexModel,
  };
} 
