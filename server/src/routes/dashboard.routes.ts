import express from "express";

import {
  getDashboardStats,
  getResumeAnalytics,
}
from "../controllers/dashboard.controller.js";

const router =
  express.Router();

router.get(
  "/stats",
  getDashboardStats
);

router.get(
  "/resume-analytics",
  getResumeAnalytics
);

export default router;