import { Request, Response } from "express";

export const errorHandler = (
  error: TypeError,
  _req: Request,
  res: Response
) => {
  res.status(500).json({
    name: error.name,
    message: error.message,
  });
};
