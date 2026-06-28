import express from "express";

import {
  saveInterview,
  getMyInterviews,
} from "../controllers/interview-session.controller";

import {
  authMiddleware,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/save",
  authMiddleware,
  saveInterview
);

router.get(
  "/my-history",
  authMiddleware,
  getMyInterviews
);

export default router;