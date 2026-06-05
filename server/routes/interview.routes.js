import express from "express";

import {
  getQuestion,
} from "../controllers/interview.controller.js";

const router =
  express.Router();

router.post(
  "/question",
  getQuestion
);

export default router;