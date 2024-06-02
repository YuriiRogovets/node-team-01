import express, { json } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/api/productRouter.js";
import userRouter from "./routes/api/userRouter.js";

const app = express();

app.use(json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  const { message, status = 500 } = error;
  res.status(status).json({ message });
});

const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection succsefuly");
    app.listen(process.env.PORT, () =>
      console.log(`Server start on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error(error));
