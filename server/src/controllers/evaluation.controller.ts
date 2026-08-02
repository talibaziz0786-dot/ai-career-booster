import { Request, Response } from "express";
import { askAI } from "../services/ai/ai-manager.service.js";
import { asBoundedString } from "../utils/validate-input.js";

export const evaluateAnswer = async (
  req: Request,
  res: Response
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
    res.status(500).json({
      success: false,
    });
  }
};