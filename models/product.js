import { Schema, model } from "mongoose";
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Product = model("product", productSchema);
