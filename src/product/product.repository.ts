import { Product } from "@prisma/client";
import prisma from "../utils/prisma";

export const findProduct = async () => {
  const product = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return product;
};

export const findProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return product;
};

export const insertProduct = async (payload: Product) => {
  const product = await prisma.product.create({
    data: {
      name: payload.name,
      price: payload.price,
    },
  });
  return product;
};

export const updateProduct = async (id: string, payload: Product) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
      price: payload.price,
    },
  });

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return product;
};
