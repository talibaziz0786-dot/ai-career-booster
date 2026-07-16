import type { Request, Response } from "express";
import { analyzeResumeWithAI } from "../services/ai/resume-analysis.service.js";

export const analyzeResumeController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      resumeText,
      language = "english",
    } = req.body;

    if (
      !resumeText ||
      resumeText.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    const analysis =
      await analyzeResumeWithAI(
        resumeText,
        language
      );

    return res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(
      "Resume Analysis Controller Error"
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to analyze resume.",
    });

  }
};