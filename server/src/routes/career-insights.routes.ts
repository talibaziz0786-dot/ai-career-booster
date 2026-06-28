import express from "express";

import {
  getCareerInsights,
} from "../controllers/career-insights.controller.js";

const router = express.Router();

router.post(
  "/generate",
  getCareerInsights
);

export default router;