import jwt from "jsonwebtoken";

import { requireEnv } from "../config/env.js";

export const generateToken = (
  id: string
) => {
  return jwt.sign(
    { id },
    requireEnv("JWT_SECRET"),
    {
      expiresIn: "7d",
    }
  );
};