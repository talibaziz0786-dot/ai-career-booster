import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set."
    );
  }

  try {
    await mongoose.connect(uri);

    console.log(
      "✅ MongoDB Connected"
    );
  } catch (error) {
    throw new Error(
      "Failed to connect to MongoDB.",
      { cause: error }
    );
  }
};