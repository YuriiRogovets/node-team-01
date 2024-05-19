import e from "express";
import express from "express";

const productRouter = express.Router();

productRouter.get("/", () => console.log("getProducts"));
