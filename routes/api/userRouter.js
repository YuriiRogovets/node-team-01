import express from "express";
import {
  loginUser,
  registerUser,
  updatePassword,
} from "../../controllers/usersController.js";
import {
  updatePasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../../schemas/userSchema.js";
import { validateBody } from "../../helpers/validateBody.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegisterSchema), registerUser);

userRouter.post("/login", validateBody(userLoginSchema), loginUser);
userRouter.post('/password/update', validateBody(updatePasswordSchema), updatePassword)

export default userRouter;
