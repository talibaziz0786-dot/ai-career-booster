import { Router } from "express";

import {
  recruiterSimulationController,
} from "../controllers/recruiter.controller.js";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

/**
 * POST
 * /api/recruiter/simulate
 */
router.post(
  "/simulate",
  authMiddleware,
  recruiterSimulationController
);

export default router;