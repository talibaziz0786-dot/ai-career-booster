import type {
Response,
} from "express";

import type {
AuthRequest,
} from "../middleware/auth.middleware.js";

import {
analyzeResumeAI,
} from "../services/ai/resume-analysis.service.js";

export const analyzeResumeController =
async (
req: AuthRequest,
res: Response
) => {
try {
if (!req.user) {
return res.status(401).json({
success: false,
message:
"Authentication required.",
});
}

  const {
    resumeText,
    language = "english",
  } = req.body;

  if (
    typeof resumeText !== "string" ||
    !resumeText.trim()
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Resume text is required.",
    });
  }

  const analysis =
    await analyzeResumeAI(
      req.user.id,
      resumeText,
      language
    );

  return res.status(200).json({
    success: true,
    message:
      "Resume analyzed successfully.",
    analysis,
  });
} catch (error) {
  console.error(
    "Resume Analysis Controller Error:",
    error
  );

  return res.status(500).json({
    success: false,
    message:
      "Resume analysis failed.",
  });
}

};