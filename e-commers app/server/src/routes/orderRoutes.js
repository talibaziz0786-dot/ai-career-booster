import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); 

// ✅ test route
router.get("/", (req, res) => {
  res.send("Orders root working ✅");
});

// ✅ create order
router.post("/", protect, createOrder);

export default router;