import { productType } from "../types/product.type";
import {
  deleteProduct,
  findProduct,
  findProductById,
  insertProduct,
  updateProduct,
} from "./product.repository";

export const getAllProduct = async () => {
  const product = await findProduct();

  return product;
};

export const getProductById = async (id: string) => {
  const product = await findProductById(id);

  return product;
};

export const createProduct = async (payload: productType) => {
  const product = await insertProduct(payload);

  return product;
};

export const editProduct = async (id: string, payload: productType) => {
  const product = await updateProduct(id, payload);

  return product;
};

export const removeProductById = async (id: string) => {
  const product = await deleteProduct(id);

  return product;
};
