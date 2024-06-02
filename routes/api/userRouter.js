import express from "express";
import { loginUser, registerUser } from "../../controllers/usersController.js";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../../schemas/userSchema.js";
import { validateBody } from "../../helpers/validateBody.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegisterSchema), registerUser);

userRouter.post("/login", validateBody(userLoginSchema), loginUser);

export default userRouter;
