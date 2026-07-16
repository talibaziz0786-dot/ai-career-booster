import { Router } from "express";

import {
  getMySubscription,
  startTrial,
  upgradePlan,
  cancelSubscription,
  resetDailyUsage,
} from "../controllers/subscription.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  getMySubscription
);

router.post(
  "/trial",
  authMiddleware,
  startTrial
);

router.put(
  "/upgrade",
  authMiddleware,
  upgradePlan
);

router.put(
  "/cancel",
  authMiddleware,
  cancelSubscription
);

router.put(
  "/reset-usage",
  authMiddleware,
  resetDailyUsage
);

export default router;