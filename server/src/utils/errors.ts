export class AppError extends Error {
  readonly statusCode: number;

  readonly expose: boolean;

  constructor(
    message: string,
    statusCode = 500,
    options: {
      cause?: unknown;
      expose?: boolean;
    } = {}
  ) {
    super(message, { cause: options.cause });

    this.name = "AppError";
    this.statusCode = statusCode;
    this.expose = options.expose ?? true;

    Error.captureStackTrace?.(this, AppError);
  }
}

export function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    typeof error === "string"
      ? error
      : JSON.stringify(error),
    { cause: error }
  );
}

export function getErrorMessage(error: unknown): string {
  return toError(error).message;
}
