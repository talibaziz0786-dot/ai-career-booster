import { Router } from "express";

import {
  evaluateAnswer,
} from "../controllers/evaluation.controller";

const router = Router();

router.post(
  "/evaluate",
  evaluateAnswer
);

export default router;