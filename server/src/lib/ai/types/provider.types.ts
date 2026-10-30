export type AIProviderName =
  | "openai"
  | "gemini"
  | "openrouter";

export type AIProvider =
  AIProviderName;

export interface AIResponse {
  text: string;

  json?: unknown;

  provider:
    AIProviderName;

  model: string;

  latency: number;

  tokensUsed?: number;
}

export interface AIProviderAdapter {
  readonly name:
    AIProviderName;

  isAvailable():
    Promise<boolean>;

  generate(
    prompt: string
  ): Promise<AIResponse>;
}

export interface AIManagerResult
  extends AIResponse {
  attempts: number;

  attemptedProviders:
    AIProviderName[];
}