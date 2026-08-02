import { toError } from "../../../utils/errors.js";

interface RetryOptions {

  retries?: number;

  delay?: number;

}

function sleep(ms: number) {

  return new Promise((resolve) =>

    setTimeout(resolve, ms)

  );

}

export async function retryAI<T>(

  callback: () => Promise<T>,

  options: RetryOptions = {}

): Promise<T> {

  const retries =

    options.retries ?? 3;

  const delay =

    options.delay ?? 1000;

  let lastError: unknown;

  for (

    let attempt = 1;

    attempt <= retries;

    attempt++

  ) {

    try {

      return await callback();

    }

    catch (error) {

      lastError = error;

      console.warn(

        `[AI Retry] Attempt ${attempt}/${retries} failed:`,

        toError(error).message

      );

      if (

        attempt < retries

      ) {

        await sleep(delay);

      }

    }

  }

  throw new Error(

    `AI call failed after ${retries} attempts.`,

    { cause: lastError }

  );

}
