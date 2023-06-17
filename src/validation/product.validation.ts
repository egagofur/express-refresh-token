import { z } from "zod";
import { Product } from "@prisma/client";

export const createProductValidation = (payload: Product) => {
  const createProductSchema = z.object({
    name: z
      .string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be a string",
      })
      .min(3),
    price: z.number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    }),
  });

  return createProductSchema.safeParse(payload);
};

export const updateProductValidation = (payload: Product) => {
  const updateProductSchema = z.object({
    name: z.string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a string",
    }),
    price: z.number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    }),
  });

  return updateProductSchema.safeParse(payload);
};

export const deleteProductValidation = (payload: Product) => {
  const deleteProductSchema = z.object({
    id: z.string({
      required_error: "Product id is required",
      invalid_type_error: "Product id must be a string",
    }),
  });

  return deleteProductSchema.safeParse(payload);
};
