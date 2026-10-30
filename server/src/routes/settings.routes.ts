import { Router } from "express";

import {
  getMySettings,
  updateMySettings,
} from "../controllers/settings.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

/* ==========================================================\
   Settings
========================================================== */

router.get(
  "/me",
  authMiddleware,
  getMySettings
);

router.put(
  "/me",
  authMiddleware,
  updateMySettings
);

export default router;