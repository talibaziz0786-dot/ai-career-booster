import type { Request, Response } from "express";
import { askAI } from "../services/ai/ai-manager.service.js";
import { asStringArray } from "../utils/validate-input.js";

export const getCareerInsights = async (
  req: Request,
  res: Response
) => {
  try {
    const overallScore = Number(
      req.body?.overallScore
    );

    const strengths = asStringArray(
      req.body?.strengths
    );

    const weaknesses = asStringArray(
      req.body?.weaknesses
    );

    if (!Number.isFinite(overallScore)) {
      return res.status(400).json({
        success: false,
        message:
          "A numeric overallScore is required.",
      });
    }

    const result = await askAI({
      userId: (req as any).user?.id,
      prompt: `
You are a Senior FAANG Career Coach.

Interview Score:
${overallScore}

Strengths:
${strengths.join(", ")}

Weaknesses:
${weaknesses.join(", ")}

Return ONLY JSON.

{
  "focusAreas": [],
  "recommendedProjects": [],
  "careerAdvice": ""
}
`,
    });

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