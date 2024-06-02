import { createError } from "./createError.js";

export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw createError(400, error.message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
