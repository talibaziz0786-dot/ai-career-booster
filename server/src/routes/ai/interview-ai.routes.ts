import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { checkAIUsage } from "../../middleware/ai-usage.middleware.js";

import {
  generateInterviewQuestions,
} from "../../controllers/ai/interview-ai.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  checkAIUsage("interview"),
  generateInterviewQuestions
);

export default router;