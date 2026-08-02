import type { AuthRequest } from "../middleware/auth.middleware.js";

import { buildResume } from "../services/ai/resume-builder/services/resume-builder-ai.service.js";
import ResumeBuilder from "../models/resume-builder.model.js";
import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const generateResumeController = asyncHandler<AuthRequest>(
  async (req, res) => {
    const {
      resumeText,
      language = "english",
    } = req.body;

    if (!resumeText) {
      return sendError(
        res,
        400,
        "resumeText is required."
      );
    }

    const result = await buildResume(
      req.user?.id as string,
      resumeText,
      language
    );

    return sendSuccess(res, {
      data: result,
    });
  },
  "Resume Builder failed."
);

export const getResumeHistoryController = asyncHandler<AuthRequest>(
  async (req, res) => {
    const resumes = await ResumeBuilder.find({
      user: req.user!.id,
    }).sort({
      updatedAt: -1,
    });

    return sendSuccess(res, {
      data: resumes,
    });
  }
);

export const getResumeController = asyncHandler<AuthRequest>(
  async (req, res) => {
    const resume = await ResumeBuilder.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!resume) {
      return sendError(res, 404);
    }

    return sendSuccess(res, {
      data: resume,
    });
  }
);

export const updateResumeController = asyncHandler<AuthRequest>(
  async (req, res) => {
    const resume =
      await ResumeBuilder.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user!.id,
        },
        {
          content: req.body,
        },
        {
          new: true,
        }
      );

    return sendSuccess(res, {
      data: resume,
    });
  }
);
