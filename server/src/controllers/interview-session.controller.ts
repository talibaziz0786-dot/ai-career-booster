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

    const session =
      await InterviewSession.create({
        user: req.user?.id,

        ...req.body,
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