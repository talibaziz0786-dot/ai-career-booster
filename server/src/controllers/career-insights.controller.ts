import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  askAI,
} from "../lib/ai/ai-orchestrator.js";

export const getCareerInsights = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      overallScore,
      strengths = [],
      weaknesses = [],
    } = req.body;

    const prompt = `
You are a Senior FAANG Career Coach.

Interview Score:
${overallScore}

Strengths:
${strengths.join(", ")}

Weaknesses:
${weaknesses.join(", ")}

Return ONLY valid JSON.

{
  "focusAreas": [],
  "recommendedProjects": [],
  "careerAdvice": ""
}
`;

    if (!req.user) {
    return res.status(401).json({
        success: false,
        message: "Unauthorized",
    });
}

const result = await askAI({
    userId: req.user.id,
    prompt,
});

    const rawContent =
      result.content ?? "";

    const jsonMatch =
      rawContent.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        "Invalid AI response"
      );
    }

    res.json({
      success: true,
      insights: JSON.parse(
        jsonMatch[0]
      ),
    });

  } catch (error) {

    console.error(
      "Career Insight Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to generate insights",
    });

  }
};
