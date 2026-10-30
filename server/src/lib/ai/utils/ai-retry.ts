export interface AIRetryOptions {
  retries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

const sleep = (
  ms: number
): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export async function retryAI<T>(
  operation: () => Promise<T>,
  options: AIRetryOptions = {}
): Promise<T> {
  const {
    retries = 2,
    initialDelay = 500,
    maxDelay = 5_000,
    backoffMultiplier = 2,
  } = options;

  let lastError: unknown;

  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      const delay = Math.min(
        initialDelay *
          Math.pow(
            backoffMultiplier,
            attempt
          ),
        maxDelay
      );

      await sleep(delay);
    }
  }

  throw (
    lastError instanceof Error
      ? lastError
      : new Error(
          "AI operation failed after retries."
        )
  );
}