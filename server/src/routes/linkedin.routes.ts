import { Router } from "express";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

import {
  optimizeLinkedInController,
  getLinkedInHistoryController,
  deleteLinkedInHistoryController,
  exportLinkedInPdfController,
} from "../controllers/linkedin.controller.js";

const router = Router();

router.post(
  "/optimize",
  authMiddleware,
  optimizeLinkedInController
);

router.get(
  "/history",
  authMiddleware,
  getLinkedInHistoryController
);

router.delete(
  "/:id",
  authMiddleware,
  deleteLinkedInHistoryController
);

router.get(
  "/:id/pdf",
  authMiddleware,
  exportLinkedInPdfController
);

export default router;
