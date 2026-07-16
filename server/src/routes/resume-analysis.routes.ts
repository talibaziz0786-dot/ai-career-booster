import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { checkAIUsage } from "../middleware/ai-usage.middleware.js";

import {
  analyzeResumeController,
} from "../controllers/resume-analysis.controller.js";

const router = express.Router();

router.post(
  "/analyze",
  authMiddleware,
  checkAIUsage("ats"),
  analyzeResumeController
);

export default router;