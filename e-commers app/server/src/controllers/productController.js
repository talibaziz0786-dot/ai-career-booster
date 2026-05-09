// src/controllers/productController.js

import Product from "../models/Product.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {

    console.log(req.body);

    const {
      name,
      price,
      description,
      images,
      category,
      countInStock,
    } = req.body;

    const product = new Product({
      name,
      price: Number(price),
      description,
      images,
      category,
      countInStock: Number(countInStock),
      user: req.user._id,
    });

    const createdProduct =
      await product.save();

    res.status(201).json(
      createdProduct
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts =
  async (req, res) => {
    const products =
      await Product.find();

    res.json(products);
  };

// GET SINGLE PRODUCT
export const getProductById =
  async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      );

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message:
          "Product not found",
      });
    }
  };

// DELETE PRODUCT
export const deleteProduct =
  async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      );

    if (product) {
      await product.deleteOne();

      res.json({
        message:
          "Product removed",
      });
    } else {
      res.status(404).json({
        message:
          "Product not found",
      });
    }
  };

// UPDATE PRODUCT
export const updateProduct =
  async (req, res) => {

    const product =
      await Product.findById(
        req.params.id
      );

    if (product) {

      product.name =
        req.body.name ||
        product.name;

      product.price =
        req.body.price ||
        product.price;

      product.description =
        req.body.description ||
        product.description;

      product.images =
        req.body.images ||
        product.images;

      product.category =
        req.body.category ||
        product.category;

      product.countInStock =
        req.body.countInStock ||
        product.countInStock;

      const updatedProduct =
        await product.save();

      res.json(
        updatedProduct
      );

    } else {

      res.status(404).json({
        message:
          "Product not found",
      });
    }
  };

 

// ADD REVIEW

export const createReview =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });
      }

      const alreadyReviewed =
        product.reviews.find(
          (r) =>
            r.user.toString() ===
            req.user._id.toString()
        );

      if (alreadyReviewed) {

        return res
          .status(400)
          .json({
            message:
              "Already Reviewed",
          });
      }

      const review = {
        name:
          req.user.email,

        rating:
          Number(req.body.rating),

        comment:
          req.body.comment,

        user:
          req.user._id,
      };

      product.reviews.push(
        review
      );

      product.numReviews =
        product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (acc, item) =>
            item.rating + acc,
          0
        ) /
        product.reviews.length;

      await product.save();

      res.status(201).json({
        message:
          "Review Added",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Review Failed",
      });
    }
  };