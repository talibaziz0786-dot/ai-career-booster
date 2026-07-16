import type {
  Request,
  Response,
} from "express";

export const createOrder =
async (
  req: Request,
  res: Response
) => {

  res.json({

    success: true,

    message:
      "Order creation coming next step.",

  });

};