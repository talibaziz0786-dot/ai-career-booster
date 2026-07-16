import type { Request, Response } from "express";

import { extractResumeText }
from "../services/resume-parser.service.js";

export const uploadResume =
async (
  req: Request,
  res: Response
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

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Resume parsing failed",

    });

  }

};