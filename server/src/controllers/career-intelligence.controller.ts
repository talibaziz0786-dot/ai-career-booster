import type { Request } from "express";

import { generateCareerIntelligence } from "../services/ai/career-intelligence.service.js";
import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const careerIntelligenceController = asyncHandler<Request>(
  async (req, res) => {
    const { resumeText, userId } = req.body;

    if (!resumeText || !userId) {
      return sendError(
        res,
        400,
        "resumeText and userId are required."
      );
    }

    const profile =
      await generateCareerIntelligence(
        `career:${userId}`,
        resumeText
      );

    return sendSuccess(res, {
      profile,
    });
  },
  "Failed to generate career intelligence."
);
