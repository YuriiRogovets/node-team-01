import { isValidObjectId } from "mongoose";
import { createError } from "../helpers/createError.js";

export const isValidId = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw createError(400, "Invalid id");
        }

        next();
    } catch (error) {
        next(error);
    }
} 