import { Router } from "express";

import {
  generateFeedback,
} from "../controllers/evaluation.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Evaluate interview answers
 * and generate AI-powered feedback.
 *
 * Quota enforcement is handled by
 * the centralized AI orchestrator.
 */
router.post(
  "/",
  authMiddleware,
  generateFeedback
);

export default router;