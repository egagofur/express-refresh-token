import express, { Request, Response } from "express";
import {
  createProductValidation,
  updateProductValidation,
} from "../validation/product.validation";
import {
  createProduct,
  editProduct,
  getAllProduct,
  getProductById,
  removeProductById,
} from "./product.service";
import { productType } from "../types/product.type";
import { requireAdmin, requireUser } from "../middleware/auth";

const router = express.Router();

router.get("/", requireUser, async (_req: Request, res: Response) => {
  try {
    const getProducts = await getAllProduct();

    return res.status(200).json({
      message: "Get all products",
      data: getProducts,
    });
  } catch (error: any) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.get("/:id", requireUser, async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const getProduct = await getProductById(id);
    if (!getProduct) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Get product by id",
      data: getProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const validate = createProductValidation(payload);
    if (!validate.success) {
      const error = validate.error.issues[0].message;
      return res.status(400).json({
        name: "ValidationError",
        message: error,
      });
    }

    const newProduct = await createProduct(validate.data as productType);

    return res.status(201).json({
      message: "Create product success",
      data: newProduct,
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const validate = updateProductValidation(payload);

    if (!validate.success) {
      const error = validate.error.issues[0].message;
      return res.status(400).json({
        name: "ValidationError",
        message: error,
      });
    }

    const updateProduct = await editProduct(id, validate.data as productType);

    return res.status(200).json({
      message: "Update product success",
      data: updateProduct,
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const productId = await getProductById(id);
    if (!productId) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
      });
    }
    await removeProductById(productId.id);

    return res.status(200).json({
      message: "Delete product success",
      data: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
});

export default router;
