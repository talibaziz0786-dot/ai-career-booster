import express from "express";

import {
  getQuestion,
  generateFeedback,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
  "/question",
  getQuestion
);

router.post(
  "/feedback",
  generateFeedback
);

export default router;