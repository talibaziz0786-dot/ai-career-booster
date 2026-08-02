import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError, toError } from "../utils/errors.js";

export function notFoundHandler(
  req: Request,
  res: Response
) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
  }

  const normalized = toError(error);

  const statusCode =
    normalized instanceof AppError
      ? normalized.statusCode
      : 500;

  const expose =
    normalized instanceof AppError
      ? normalized.expose
      : false;

  console.error(
    `[${req.method} ${req.originalUrl}] ${normalized.name}: ${normalized.message}`,
    normalized.stack
  );

  if (normalized instanceof AggregateError) {
    normalized.errors.forEach((inner) =>
      console.error("  aggregated:", toError(inner))
    );
  }

  let cause = normalized.cause;

  for (let depth = 0; cause && depth < 5; depth++) {
    const causeError = toError(cause);

    console.error("  caused by:", causeError);

    cause = causeError.cause;
  }

  res.status(statusCode).json({
    success: false,
    message: expose
      ? normalized.message
      : "Something went wrong. Please try again.",
  });
}
