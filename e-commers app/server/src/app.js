import express from "express";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use(express.json()); // 👈 MUST

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});