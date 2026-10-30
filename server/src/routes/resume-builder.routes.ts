import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
  generateResumeController,
  
} from "../controllers/resume-builder.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  generateResumeController
);



export default router;