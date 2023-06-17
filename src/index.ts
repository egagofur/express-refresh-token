import express from "express";
import config from "./utils/config";
import { notFound } from "./utils/404";
import { errorHandler } from "./utils/errorHandler";
import productController from "./product/product.controller";
import authController from "./auth/auth.controller";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

app.use("/api", authController);
app.use("/api/products", productController);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
