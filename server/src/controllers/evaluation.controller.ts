import { Request, Response } from "express";
import { askAI } from "../services/ai/ai-manager.service.js";

export const evaluateAnswer = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      question,
      answer,
    } = req.body;

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