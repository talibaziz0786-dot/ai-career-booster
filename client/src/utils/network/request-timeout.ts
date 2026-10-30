export function withTimeout<T>(
  promise: Promise<T>,
  timeout = 60000
): Promise<T> {
  return Promise.race([
    promise,

    new Promise<T>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              "Request timeout."
            )
          ),
        timeout
      )
    ),
  ]);
}