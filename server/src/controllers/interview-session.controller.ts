import type { Response } from "express";

import InterviewSession
from "../models/interview-session.model.js";

import type {
  AuthRequest,
} from "../middleware/auth.middleware.js";

export const saveInterview =
async (
  req: AuthRequest,
  res: Response
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

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }
};

export const getMyInterviews =
async (
  req: AuthRequest,
  res: Response
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

    console.error(error);

    res.status(500).json({
      success: false,
    });

  }
};