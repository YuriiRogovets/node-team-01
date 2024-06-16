import Joi from "joi";

export const userRegisterSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
export const userLoginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
  email: Joi.string().required().email(),
});


