import { Router } from "express";

import {
  evaluateAnswer,
} from "../controllers/evaluation.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

import {
  checkAIUsage,
} from "../middleware/ai-usage.middleware.js";

const router = Router();

router.post(
  "/evaluate",
  authMiddleware,
  checkAIUsage("interview"),
  evaluateAnswer
);

export default router;