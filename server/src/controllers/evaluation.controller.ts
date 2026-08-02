import type {
  NextFunction,
  Request,
  Response,
} from "express";
import { askAI } from "../services/ai/ai-manager.service.js";
import { asBoundedString } from "../utils/validate-input.js";
import { AppError } from "../utils/errors.js";

export const evaluateAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const question = asBoundedString(
      req.body?.question,
      5000
    );

    const answer = asBoundedString(
      req.body?.answer,
      20000
    );

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message:
          "A question and an answer are required.",
      });
    }

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
      await askAI({
        userId: (req as any).user?.id,
        prompt,
      });

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