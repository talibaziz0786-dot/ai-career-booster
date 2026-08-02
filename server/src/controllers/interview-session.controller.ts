import type { NextFunction, Response } from "express";

import { AppError } from "../utils/errors.js";

import InterviewSession
from "../models/interview-session.model.js";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

export const saveInterview =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    const { user, _id, ...payload } =
      (req.body ?? {}) as Record<
        string,
        unknown
      >;

    const session =
      await InterviewSession.create({
        ...payload,

        user: req.user?.id,
      });

    res.status(201).json({
      success: true,
      session,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to save interview session",
        500,
        { cause: error }
      )
    );

  }
};

export const getMyInterviews =
async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    const sessions =
      await InterviewSession.find({
        user: req.user?.id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      sessions,
    });

  } catch (error) {

    next(
      new AppError(
        "Unable to load interview sessions",
        500,
        { cause: error }
      )
    );

  }
};