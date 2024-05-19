import express from "express";
import {
  getProducts,
  addProduct,
} from "../../controllers/productsController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", addProduct);

export default productRouter;
