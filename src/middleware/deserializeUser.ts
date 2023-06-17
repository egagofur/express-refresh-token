import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(" ").pop();

  if (!accessToken) {
    return next();
  }

  try {
    const token = verifyJWT(accessToken);
    if (token.decode) {
      res.locals.user = token.decode;
      return next();
    }
    if (token.expired) {
      return next();
    }

    return next();
  } catch (error) {
    return next();
  }
};

export default deserializeUser;
