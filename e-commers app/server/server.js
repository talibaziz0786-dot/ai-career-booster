// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

// ROUTES
app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

    app.listen(5000, () => {

      console.log(
        "Server running on port 5000"
      );
    });
  })
  .catch((error) => {

    console.log(error);
  });