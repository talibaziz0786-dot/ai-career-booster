import type { Request } from "express";

import { askAI } from "../services/ai/ai-manager.service.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";

export const evaluateAnswer = asyncHandler<Request>(
  async (req, res) => {
    const { question, answer } = req.body;

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

    const result = await askAI(prompt);

    return sendSuccess(res, {
      result,
    });
  }
);
