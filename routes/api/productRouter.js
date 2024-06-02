import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateImages,
} from "../../controllers/productsController.js";
import { isValidId, authenticate } from "../../middlewares/index.js";
import { upload } from "../../middlewares/uploadImages.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post(
  "/",
  // authenticate,
  addProduct
);
productRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  (_, __, next) => {
    console.log("m1");
    next();
  },
  (_, __, next) => {
    console.log("m2");
    next();
  },
  deleteProduct
);
productRouter.patch(
  "/:id/images",
  upload.array("productImages", 5),
  updateImages
);

export default productRouter;
