import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct
} from "../../controllers/productsController.js";
import { isValidId, authenticate } from "../../middlewares/index.js";


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", authenticate, addProduct);
productRouter.delete("/:id", authenticate, isValidId, (_, __, next) => {console.log("m1"); next()}, (_, __, next) => {console.log("m2"); next()}, deleteProduct);


export default productRouter;
