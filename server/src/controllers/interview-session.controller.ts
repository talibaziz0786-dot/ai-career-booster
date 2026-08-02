import InterviewSession from "../models/interview-session.model.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";

export const saveInterview = asyncHandler<AuthRequest>(
  async (req, res) => {
    const session = await InterviewSession.create(
      {
        user: req.user?.id,

        ...req.body,
      }
    );

    return sendSuccess(
      res,
      {
        session,
      },
      201
    );
  }
);

export const getMyInterviews = asyncHandler<AuthRequest>(
  async (req, res) => {
    const sessions = await InterviewSession.find(
      {
        user: req.user?.id,
      }
    ).sort({
      createdAt: -1,
    });

    return sendSuccess(res, {
      sessions,
    });
  }
);
