import { Request, Response, NextFunction } from "express";

export const requireUser = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(403).json({
      message: "Unauthorized, please login first",
    });
  }

  return next();
};

export const requireAdmin = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Unauthorized, please login as admin",
    });
  }

  return next();
};
