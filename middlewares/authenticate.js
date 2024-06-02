import { createError } from "../helpers/createError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticate =  async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            throw createError (401, "not authorization")
        }

        const [bearer, token] = authorization.split(" ", 2);

        if (bearer !== "Bearer" || !token) {
            throw createError(401, "not authorization");
        }

        const {id} = jwt.verify(token, process.env.JWT_SECRET);

         if (!id) {
            throw createError(401, "not authorization");
        }

        const user = await User.findById(id);

        if (!user || user.token !== token) { 
            throw createError(401, "not authorization");
            
        }

        req.user = user;
                       
        next()

    } catch (error) {
        next(error);
    }
}