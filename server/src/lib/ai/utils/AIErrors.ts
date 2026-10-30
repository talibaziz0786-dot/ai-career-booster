/**
 * ============================================================
 * CareerBoost AI - Provider Errors
 * ============================================================
 *
 * Centralized error types for all AI providers.
 *
 * Goals:
 * - Preserve HTTP status codes
 * - Distinguish retryable/non-retryable failures
 * - Preserve original provider error message
 * - Allow AIManager to make intelligent fallback decisions
 * - Never expose API keys/secrets
 * ============================================================
 */

export class AIProviderError extends Error {
  public readonly provider: string;
  public readonly status?: number;
  public readonly retryable: boolean;
  public readonly code?: string;

  constructor(
    message: string,
    provider: string,
    status?: number,
    retryable = false,
    code?: string
  ) {
    super(message);

    this.name = "AIProviderError";

    this.provider = provider;
    this.status = status;
    this.retryable = retryable;
    this.code = code;

    Object.setPrototypeOf(
      this,
      new.target.prototype
    );
  }
}

/**
 * ============================================================
 * Rate Limit / Quota
 * ============================================================
 */

export class AIRateLimitError
  extends AIProviderError
{
  constructor(
    message: string,
    provider: string,
    status = 429
  ) {
    super(
      message,
      provider,
      status,
      true,
      "RATE_LIMITED"
    );

    this.name = "AIRateLimitError";
  }
}

/**
 * ============================================================
 * Timeout
 * ============================================================
 */

export class AITimeoutError
  extends AIProviderError
{
  constructor(
    message: string,
    provider: string
  ) {
    super(
      message,
      provider,
      408,
      true,
      "TIMEOUT"
    );

    this.name = "AITimeoutError";
  }
}

/**
 * ============================================================
 * Temporary Provider Failure
 * ============================================================
 */

export class AIUnavailableError
  extends AIProviderError
{
  constructor(
    message: string,
    provider: string,
    status?: number
  ) {
    super(
      message,
      provider,
      status,
      true,
      "UNAVAILABLE"
    );

    this.name = "AIUnavailableError";
  }
}

/**
 * ============================================================
 * Invalid Provider Response
 * ============================================================
 */

export class AIResponseError
  extends AIProviderError
{
  constructor(
    message: string,
    provider: string,
    status?: number
  ) {
    super(
      message,
      provider,
      status,
      false,
      "INVALID_RESPONSE"
    );

    this.name = "AIResponseError";
  }
}

/**
 * ============================================================
 * Provider Error Normalizer
 * ============================================================
 *
 * Converts unknown SDK/Axios errors into safe
 * AIProviderError instances.
 *
 * IMPORTANT:
 * Never include request headers or API keys
 * in the returned error message.
 */

export function normalizeAIError(
  error: unknown,
  provider: string
): AIProviderError {
  if (
    error instanceof AIProviderError
  ) {
    return error;
  }

  const candidate =
    error as {
      response?: {
        status?: number;
        data?: unknown;
      };

      code?: string;

      message?: string;
    };

  const status =
    candidate?.response?.status;

  const code =
    candidate?.code;

  const message =
    typeof candidate?.message ===
    "string"
      ? candidate.message
      : "Unknown AI provider error.";

  /**
   * Axios timeout.
   */
  if (
    code === "ECONNABORTED" ||
    code === "ETIMEDOUT" ||
    code === "ECONNRESET"
  ) {
    return new AITimeoutError(
      `${provider} request timed out.`,
      provider
    );
  }

  /**
   * HTTP rate limit.
   */
  if (status === 429) {
    return new AIRateLimitError(
      `${provider} rate limit or quota limit reached.`,
      provider,
      429
    );
  }

  /**
   * Temporary server/provider errors.
   */
  if (
    status === 408 ||
    status === 409 ||
    status === 425 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return new AIUnavailableError(
      `${provider} service is temporarily unavailable.`,
      provider,
      status
    );
  }

  /**
   * Authentication errors should NOT
   * endlessly retry.
   */
  if (
    status === 401 ||
    status === 403
  ) {
    return new AIProviderError(
      `${provider} authentication failed. Check the provider API key.`,
      provider,
      status,
      false,
      "AUTHENTICATION_FAILED"
    );
  }

  /**
   * Invalid request / model.
   */
  if (
    status === 400 ||
    status === 404
  ) {
    return new AIProviderError(
      `${provider} rejected the request.`,
      provider,
      status,
      false,
      "BAD_REQUEST"
    );
  }

  /**
   * Safe fallback.
   *
   * Keep original message because provider SDK
   * errors can contain useful diagnostic details.
   */
  return new AIProviderError(
    `${provider} request failed: ${message}`,
    provider,
    status,
    false,
    "PROVIDER_ERROR"
  );
}