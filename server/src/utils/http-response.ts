import type {
  NextFunction,
  Request,
  Response,
} from "express";

export function sendSuccess(
  res: Response,
  payload: Record<string, unknown> = {},
  status = 200
) {
  return res.status(status).json({
    success: true,
    ...payload,
  });
}

export function sendError(
  res: Response,
  status: number,
  message?: string
) {
  return res.status(status).json({
    success: false,
    ...(message ? { message } : {}),
  });
}

type AsyncHandler<Req extends Request> = (
  req: Req,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * Wraps a controller so thrown errors are logged and answered with a
 * `{ success: false }` 500 response instead of repeating try/catch blocks.
 */
export function asyncHandler<Req extends Request>(
  handler: AsyncHandler<Req>,
  errorMessage?: string
): AsyncHandler<Req> {
  return async (req, res, next) => {
    try {
      return await handler(req, res, next);
    } catch (error) {
      console.error(
        errorMessage ?? "Request failed",
        error
      );

      if (res.headersSent) {
        return;
      }

      return sendError(
        res,
        500,
        errorMessage
      );
    }
  };
}
