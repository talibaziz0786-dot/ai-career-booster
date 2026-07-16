import express from "express";

import {
  getQuestion,
  generateFeedback,
} from "../controllers/interview.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkAIUsage } from "../middleware/ai-usage.middleware.js";

const router = express.Router();

// Generate Interview Question
router.post(
  "/question",
  authMiddleware,
  checkAIUsage("interview"),
  getQuestion
);

// Generate AI Feedback
router.post(
  "/feedback",
  authMiddleware,
  
  generateFeedback
);

export default router;