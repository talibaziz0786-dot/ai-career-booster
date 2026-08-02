import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../utils/errors.js";

import { extractResumeText }
from "../services/resume-parser.service.js";

export const uploadResume =
async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Resume missing",
      });

    }

    const resumeText =
      await extractResumeText(
        req.file.path
      );

    res.json({

      success: true,

      resumeText,

    });

  } catch (error) {

    next(
      new AppError(
        "Resume parsing failed",
        500,
        { cause: error }
      )
    );

  }

};