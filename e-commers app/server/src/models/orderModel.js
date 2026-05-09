import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
    totalPrice: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);