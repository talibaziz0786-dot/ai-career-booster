export async function retry<T>(

  fn: () => Promise<T>,

  retries = 2,

  delay = 500

): Promise<T> {

  let lastError;

  for (let i = 0; i <= retries; i++) {

    try {

      return await fn();

    } catch (error) {

      lastError = error;

      if (i < retries) {

        await new Promise((resolve) =>

          setTimeout(resolve, delay)

        );

      }

    }

  }

  throw lastError;

}