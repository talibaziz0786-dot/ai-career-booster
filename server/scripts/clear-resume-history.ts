import dotenv from "dotenv";
import mongoose from "mongoose";

import ResumeBuilder from "../src/models/resume-builder.model.js";

dotenv.config();

async function clearResumeHistory() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not configured."
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    const result =
      await ResumeBuilder.deleteMany({});

    console.log(
      `Deleted ${result.deletedCount} resume history documents.`
    );
  } catch (error) {
    console.error(
      "Failed to clear resume history:",
      error
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void clearResumeHistory();