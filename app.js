import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.use("/api/products", () => {
  console.log("products");
});

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
