import type { Request } from "express";

import { askAI } from "../services/ai/ai-manager.service.js";
import {
  asyncHandler,
  sendSuccess,
} from "../utils/http-response.js";
import { parseAIJson } from "../utils/json-parser.js";

export const getCareerInsights = asyncHandler<Request>(
  async (req, res) => {
    const {
      overallScore,
      strengths,
      weaknesses,
    } = req.body;

    const result = await askAI(`
You are a Senior FAANG Career Coach.

Interview Score:
${overallScore}

Strengths:
${strengths?.join(", ")}

Weaknesses:
${weaknesses?.join(", ")}

Return ONLY JSON.

{
  "focusAreas": [],
  "recommendedProjects": [],
  "careerAdvice": ""
}
`);

    return sendSuccess(res, {
      insights: parseAIJson(result.content),
    });
  },
  "Failed to generate insights"
);
