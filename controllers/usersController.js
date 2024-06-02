import { createError } from "../helpers/createError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = await User.create({ email, password: hashPassword });

    res.status(201).send({ email, _id: addUser._id });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, "Email or password not correct");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(400, "Email or password not correct");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    const loginUser = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    ).select({ password: 0, createdAt: 0, updatedAt: 0 });
    res.send(loginUser);
  } catch (error) {
    next(error);
  }
};
