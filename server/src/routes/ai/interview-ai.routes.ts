import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import {
  generateInterviewQuestions,
} from "../../controllers/ai/interview-ai.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  generateInterviewQuestions
);

export default router;