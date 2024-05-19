import { Product } from "../models/product.js";

export const getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};
export const addProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
