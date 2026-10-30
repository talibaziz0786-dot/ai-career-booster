import type {
Request,
Response,
} from "express";

import {
generateCareerIntelligence,
} from "../services/ai/career-intelligence.service.js";

export async function careerIntelligenceController(
req: Request,
res: Response
) {
try {
const {
resumeText,
} = req.body;


if (
  typeof resumeText !== "string" ||
  resumeText.trim().length === 0
) {
  return res.status(400).json({
    success: false,
    message:
      "Resume text is required.",
  });
}

const userId =
  req.user?.id;

if (!userId) {
  return res.status(401).json({
    success: false,
    message:
      "Authentication required.",
  });
}

const cacheKey =
  `career-intelligence:${userId}`;

const profile =
  await generateCareerIntelligence(
    userId,
    cacheKey,
    resumeText
  );

return res.status(200).json({
  success: true,
  profile,
});

} catch (error) {
console.error(
"Career Intelligence Error:",
error
);

return res.status(500).json({
  success: false,
  message:
    "Failed to generate career intelligence.",
});
}
}
