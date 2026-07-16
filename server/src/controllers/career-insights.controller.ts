import type { Request, Response } from "express";
import { askAI } from "../services/ai/ai-manager.service.js";

export const getCareerInsights = async (
  req: Request,
  res: Response
) => {
  try {
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

    const rawContent =
  result.content ?? "";

const jsonMatch =
  rawContent.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid AI response");
    }

    res.json({
      success: true,
      insights: JSON.parse(jsonMatch[0]),
    });

  } catch (error) {

   console.error(
    "Career Insight Error:",
    error
  );

    res.status(500).json({
      success: false,
      message: "Failed to generate insights",
    });
  }
};