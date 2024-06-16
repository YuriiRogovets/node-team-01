import express from "express";
import {
  loginUser,
  registerUser,
  updatePassword,
  sendPasswordEmail,
  updateNewPassword,
} from "../../controllers/usersController.js";
import {
  updatePasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../../schemas/userSchema.js";
import { validateBody } from "../../helpers/validateBody.js";
import { authenticatePasswordUpdating } from "../../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegisterSchema), registerUser);

userRouter.post("/login", validateBody(userLoginSchema), loginUser);
userRouter.post(
  "/password/update",
  validateBody(updatePasswordSchema),
  updatePassword
);
userRouter.post(
  "/password/send/email",
  validateBody(updatePasswordSchema),
  sendPasswordEmail
);
userRouter.post(
  "/password/save",
  validateBody(updatePasswordSchema),
  authenticatePasswordUpdating,
  updateNewPassword
);

export default userRouter;
