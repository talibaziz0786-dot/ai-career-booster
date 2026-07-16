import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { getUsage } from "../controllers/usage.controller.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  getUsage
);

export default router;