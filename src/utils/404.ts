import { Response, Request } from "express";

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    message: "Not found",
  });
};
