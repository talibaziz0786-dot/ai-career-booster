import type {
  AIProviderName,
} from "../types/provider.types.js";

export interface AILoggerInput {
  module: string;

  provider: AIProviderName;

  success: boolean;

  retries?: number;

  latency: number;
}

export function logAIRequest(
  input: AILoggerInput
): void {
  /*
   * Never log:
   * - prompts
   * - API keys
   * - resume content
   * - AI response content
   * - authentication tokens
   */

  console.info(
    "[AI]",
    {
      module:
        input.module,

      provider:
        input.provider,

      success:
        input.success,

      retries:
        input.retries ?? 0,

      latency:
        input.latency,

      timestamp:
        new Date().toISOString(),
    }
  );
}