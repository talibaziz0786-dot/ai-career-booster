export type AIProvider =
  | "gemini-2.5-pro"
  | "gemini-2.5-flash"
  | "deepseek"
  | "qwen"
  | "local";

export type UserTier =
  | "free"
  | "premium";

export interface AskAIOptions {
  userId: string;
  prompt: string;
}

export interface AIResponse {
  provider: AIProvider;
  model: string;
  content: string;

  responseTime: number;

  tokensUsed?: number;

  estimatedCost?: number;
}

export interface ProviderResult {

  success: boolean;

  provider: AIProvider;

  responseTime: number;

  error?: string;

}

export interface ProviderHealth {

  provider: AIProvider;

  healthy: boolean;

  averageResponseTime: number;

  totalRequests: number;

  failedRequests: number;

  successRate: number;

}

export interface RetryResult {

  provider: AIProvider;

  success: boolean;

  attempts: number;

}