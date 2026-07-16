import {
  Router,
} from "express";

import {
  authMiddleware,
} from "../middleware/auth.middleware.js";

import {
  createOrder,
} from "../controllers/payment.controller.js";

const router = Router();

router.post(

  "/create-order",

  authMiddleware,

  createOrder

);

export default router;