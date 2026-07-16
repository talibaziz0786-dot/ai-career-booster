import { Router } from "express";

import {
  createResumeController,
  getResumesController,
  getResumeController,
  updateResumeController,
  deleteResumeController,
} from "../controllers/resume.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createResumeController);

router.get("/", getResumesController);

router.get("/:id", getResumeController);

router.put("/:id", updateResumeController);

router.delete("/:id", deleteResumeController);

export default router;