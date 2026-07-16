import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { checkAIUsage } from "../middleware/ai-usage.middleware.js";

import {

generateResumeController,

getResumeHistoryController,

getResumeController,

updateResumeController,

} from "../controllers/resume-builder.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  checkAIUsage("resume"),
  generateResumeController
);

router.get(
"/",
authMiddleware,
getResumeHistoryController
);

router.get(
"/:id",
authMiddleware,
getResumeController
);

router.put(
"/:id",
authMiddleware,
updateResumeController
);

export default router;