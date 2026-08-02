import express from "express";

import {
  getCareerInsights,
} from "../controllers/career-insights.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

import {
  checkAIUsage,
} from "../middleware/ai-usage.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  checkAIUsage("interview"),
  getCareerInsights
);

export default router;