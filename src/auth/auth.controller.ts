import express, { Request, Response } from "express";
import {
  createAuthSchema,
  createRefreshTokenValidation,
  createSessionValidation,
} from "../validation/auth.validation";
import { comparePassword, hashPassword } from "../utils/hashing";
import { checkEmail, registerUser } from "./auth.service";
import { authType } from "../types/auth.type";
import { signJWT, verifyJWT } from "../utils/jwt";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const validate = createAuthSchema(req.body);

  if (!validate.success) {
    const issue = validate.error.issues[0].message;
    return res.status(400).json({
      message: "Validation error",
      data: issue,
    });
  }

  try {
    const emailUser = await checkEmail(validate.data.email);
    if (emailUser) {
      return res.status(400).json({
        message: "Email already exist",
        data: null,
      });
    }

    validate.data.password = hashPassword(validate.data.password);

    const newUser = await registerUser(validate.data as authType);

    return res.status(201).json({
      message: "Register success",
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const validate = createSessionValidation(req.body);

  if (!validate.success) {
    const issue = validate.error.issues[0].message;
    return res.status(400).json({
      message: "Validation error",
      data: issue,
    });
  }

  try {
    const user = await checkEmail(validate.data.email);
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        data: null,
      });
    }

    const passwordMatch = comparePassword(
      validate.data.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password or email is wrong",
        data: null,
      });
    }

    const accessToken = signJWT(
      { id: user.id, email: user.email, role: user.role },
      {
        expiresIn: "10m",
      }
    );

    const refreshToken = signJWT(
      { id: user.id, email: user.email, role: user.role },
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Access Token",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.post("/refresh", async (req: Request, res: Response) => {
  const validate = createRefreshTokenValidation(req.body);

  if (!validate.success) {
    const issue = validate.error.issues[0].message;
    return res.status(400).json({
      message: "Validation error",
      data: issue,
    });
  }

  try {
    const { decode }: any = verifyJWT(validate.data.refreshToken);

    const user = await checkEmail(decode.email);

    if (!user) return false;

    const refreshToken = signJWT(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Get Access token success",
      data: { refreshToken },
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

export default router;
