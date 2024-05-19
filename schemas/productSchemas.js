import Joi from "joi";

export const addProductSchema = Joi.object({
    title: Joi.string().required().min(2),
    price: Joi.number().required()
});
