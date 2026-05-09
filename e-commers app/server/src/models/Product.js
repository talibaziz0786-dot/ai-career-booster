import mongoose from "mongoose";

const reviewSchema =
  new mongoose.Schema(
    {
      name: String,
      rating: Number,
      comment: String,

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      description: String,

      images: [String],

      category: String,

      countInStock: Number,

      reviews: [
        reviewSchema,
      ],

      rating: {
        type: Number,
        default: 0,
      },

      numReviews: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Product",
  productSchema
);