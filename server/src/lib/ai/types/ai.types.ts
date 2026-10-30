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
export type AIModel =
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gemini-2.5-pro"
  | "gemini-2.5-flash"
  | "openrouter-free";

export interface ProviderHealth {
  provider: AIProvider;
  healthy: boolean;
  lastCheck: Date;
  error?: string;
  averageResponseTime: number;
  totalRequests: number;
  failedRequests: number;
  successRate: number;
}