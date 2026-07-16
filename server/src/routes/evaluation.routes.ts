import { Router } from "express";

import {
  evaluateAnswer,
} from "../controllers/evaluation.controller.js";

const router = Router();

router.post(
  "/evaluate",
  evaluateAnswer
);

export default router;