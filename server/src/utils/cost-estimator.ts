import type { AIModel } from "./../lib/ai/types/ai.types.js";

const COST_PER_TOKEN: Partial<Record<AIModel, number>> = {
  "gpt-4.1": 0.000002,
  "gpt-4.1-mini": 0.0000004,

  "gemini-2.5-pro": 0.00002,
  "gemini-2.5-flash": 0.000005,
  "openrouter-free": 0,
};

export function estimateCost(
  model: AIModel,
  tokens: number
): number {
  if (!Number.isFinite(tokens) || tokens <= 0) {
    return 0;
  }

  const costPerToken = COST_PER_TOKEN[model] ?? 0;

  return Number(
    (tokens * costPerToken).toFixed(6)
  );
}