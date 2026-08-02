import type { Request } from "express";

import { extractResumeText } from "../services/resume-parser.service.js";
import {
  asyncHandler,
  sendError,
  sendSuccess,
} from "../utils/http-response.js";

export const uploadResume = asyncHandler<Request>(
  async (req, res) => {
    if (!req.file) {
      return sendError(
        res,
        400,
        "Resume missing"
      );
    }

    const resumeText = await extractResumeText(
      req.file.path
    );

    return sendSuccess(res, {
      resumeText,
    });
  },
  "Resume parsing failed"
);
