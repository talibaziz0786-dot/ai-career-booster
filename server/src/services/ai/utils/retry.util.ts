import { toError } from "../../../utils/errors.js";

export async function retry<T>(

  fn: () => Promise<T>,

  retries = 2,

  delay = 500

): Promise<T> {

  let lastError: unknown;

  for (let i = 0; i <= retries; i++) {

    try {

      return await fn();

    } catch (error) {

      lastError = error;

      console.warn(
        `[Retry] Attempt ${i + 1}/${retries + 1} failed:`,
        toError(error).message
      );

      if (i < retries) {

        await new Promise((resolve) =>

          setTimeout(resolve, delay)

        );

      }

    }

  }

  throw new Error(
    `Operation failed after ${retries + 1} attempts.`,
    { cause: lastError }
  );

}
