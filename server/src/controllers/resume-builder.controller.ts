import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  buildResume,
} from "../services/ai/resume-builder/services/resume-builder-ai.service.js";

export async function generateResumeController(
  req: AuthRequest,
  res: Response
) {
  try {
    const {
      resumeText,
      language = "english",
    } = req.body;

    if (
      typeof resumeText !== "string" ||
      !resumeText.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "resumeText is required.",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const result =
      await buildResume(
        req.user.id,
        resumeText,
        language
      );

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "Resume Builder error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Resume Builder failed.",
    });
  }
}