import type { Request, Response } from "express";

export const generateInterviewQuestions = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      role,
      experience,
      difficulty,
    } = req.body;

    // Temporary mock data
    // Later OpenAI/Gemini replace hoga

    const questions = [
      `Tell me about yourself as a ${role}.`,
      `Explain one difficult project you handled.`,
      `Why should we hire you?`,
      `What are your strengths?`,
      `Where do you see yourself in 5 years?`,
    ];

    res.status(200).json({
      success: true,
      role,
      experience,
      difficulty,
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Interview generation failed",
    });
  }
};