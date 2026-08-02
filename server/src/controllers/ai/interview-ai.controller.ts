import type { Request } from "express";

import {
  asyncHandler,
  sendSuccess,
} from "../../utils/http-response.js";

export const generateInterviewQuestions = asyncHandler<Request>(
  async (req, res) => {
    const { role, experience, difficulty } =
      req.body;

    // Temporary mock data
    // Later OpenAI/Gemini replace hoga

    const questions = [
      `Tell me about yourself as a ${role}.`,
      `Explain one difficult project you handled.`,
      `Why should we hire you?`,
      `What are your strengths?`,
      `Where do you see yourself in 5 years?`,
    ];

    return sendSuccess(res, {
      role,
      experience,
      difficulty,
      questions,
    });
  },
  "Interview generation failed"
);
