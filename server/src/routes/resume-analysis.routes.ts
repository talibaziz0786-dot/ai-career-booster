import express from "express";

import {
authMiddleware,
} from "../middleware/auth.middleware.js";

import {
analyzeResumeController,
} from "../controllers/resume-analysis.controller.js";

const router =
express.Router();

router.post(
"/",
authMiddleware,
analyzeResumeController
);

router.post(
"/analyze",
authMiddleware,
analyzeResumeController
);

export default router;