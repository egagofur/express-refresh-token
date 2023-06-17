import { User } from "@prisma/client";
import z from "zod";

export const createAuthSchema = (payload: User) => {
  const authSchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
    role: z.ZodEnum.create(["ADMIN", "REGULAR"]),
  });

  return authSchema.safeParse(payload);
};

export const createSessionValidation = (payload: User) => {
  const authSchema = z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  });

  return authSchema.safeParse(payload);
};

export const createRefreshTokenValidation = (payload: User) => {
  const authSchema = z.object({
    refreshToken: z.string({
      required_error: "Token is required",
      invalid_type_error: "Token must be a string",
    }),
  });

  return authSchema.safeParse(payload);
};
