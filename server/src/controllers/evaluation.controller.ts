import type {
  NextFunction,
  Request,
  Response,
} from "express";
import { askAI } from "../services/ai/ai-manager.service.js";
import { AppError } from "../utils/errors.js";

export const evaluateAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      question,
      answer,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message:
          "Question and answer are required.",
      });
    }

    const prompt = `
You are a Senior Technical Recruiter.

Interview Question:
${question}

Candidate Answer:
${answer}

Return response in JSON format:

{
 "score": 85,
 "strengths": [],
 "weaknesses": [],
 "improvedAnswer": "",
 "feedback": ""
}
`;

    const result =
      await askAI(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    next(
      new AppError(
        "Answer evaluation failed",
        500,
        { cause: error }
      )
    );
  }
};