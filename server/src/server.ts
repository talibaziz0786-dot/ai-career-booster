import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

import { connectDB } from "./config/db.js";

const PORT = Number(
  process.env.PORT
) || 5000;

process.on("unhandledRejection", (reason) => {
  console.error(
    "Unhandled promise rejection:",
    reason
  );

  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error(
    "Uncaught exception:",
    error
  );

  process.exit(1);
});

async function start() {
  await connectDB();

  app.listen(
    PORT,
    "0.0.0.0",
    () => {
      console.log(
        `Server running on port ${PORT}`
      );
    }
  );
}

start().catch((error) => {
  console.error(
    "Failed to start server:",
    error
  );

  process.exit(1);
});
