import type { Request } from "express";

import { analyzeResumeWithAI } from "../services/ai/resume-analysis.service.js";
import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const analyzeResumeController = asyncHandler<Request>(
  async (req, res) => {
    const {
      resumeText,
      language = "english",
    } = req.body;

    if (
      !resumeText ||
      resumeText.trim().length === 0
    ) {
      return sendError(
        res,
        400,
        "Resume text is required."
      );
    }

    const analysis = await analyzeResumeWithAI(
      resumeText,
      language
    );

    return sendSuccess(res, {
      analysis,
    });
  },
  "Failed to analyze resume."
);
