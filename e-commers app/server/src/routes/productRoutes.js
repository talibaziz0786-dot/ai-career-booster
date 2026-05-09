// src/routes/productRoutes.js

import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createReview,
} from "../controllers/productController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// PRODUCTS
router.route("/")
  .get(getProducts)
  .post(
    protect,
    admin,
    createProduct
  );

// SINGLE PRODUCT
router.route("/:id")
  .get(getProductById)
  .put(
    protect,
    admin,
    updateProduct
  )
  .delete(
    protect,
    admin,
    deleteProduct
  );

// REVIEW
router.post(
  "/:id/reviews",
  protect,
  createReview
);

export default router;