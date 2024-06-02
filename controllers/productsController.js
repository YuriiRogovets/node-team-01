import { createError } from "../helpers/createError.js";
import { Product } from "../models/product.js";
import { addProductSchema } from "../schemas/productSchemas.js";
import path from "node:path";
import * as fs from "node:fs/promises";

export const getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const { error } = addProductSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw createError(404, "Product not found");
    }
    res.status(204).json();
    console.log("after res");
  } catch (error) {
    next(error);
  }
};

export const updateImages = async (req, res, next) => {
  const promiseArray = req.files.map(async ({ path: oldPath, filename }) => {
    const newPath = path.resolve("public", "products", filename);
    await fs.rename(oldPath, newPath);
    return path.join("products", filename);
  });

  const promise = Promise.allSettled(promiseArray);

  const promiseResults = (await promise).map(({ value }) => value);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { images: promiseResults },
    { new: true }
  );

  res.json(product);
};
