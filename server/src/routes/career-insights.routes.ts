import express from "express";

import {
  getCareerInsights,
} from "../controllers/career-insights.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  getCareerInsights
);

export default router;