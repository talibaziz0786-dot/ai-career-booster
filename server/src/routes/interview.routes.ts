import { Router } from "express";

import {
  getQuestion,
  generateFeedback,
} from "../controllers/interview.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Generate next AI interview question.
 *
 * Quota enforcement is handled by the
 * centralized AI orchestrator.
 */
router.post(
  "/question",
  authMiddleware,
  getQuestion
);

/**
 * Generate complete interview feedback.
 *
 * Quota enforcement is handled by the
 * centralized AI orchestrator.
 */
router.post(
  "/feedback",
  authMiddleware,
  generateFeedback
);

export default router;