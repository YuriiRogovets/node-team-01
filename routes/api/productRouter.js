import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct
} from "../../controllers/productsController.js";
import { isValidId } from "../../middlewares/isValidId.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", addProduct);
productRouter.delete("/:id", isValidId, (_, __, next) => {console.log("m1"); next()}, (_, __, next) => {console.log("m2"); next()}, deleteProduct);


export default productRouter;
