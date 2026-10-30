export async function retryRequest<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 1000
): Promise<T> {
  let lastError: unknown;

  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw lastError;
}