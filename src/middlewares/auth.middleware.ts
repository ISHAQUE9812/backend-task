import { NextFunction } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";

export const protect = async (req: any, res: Response, next: NextFunction) => {
    try {
        let token;

        if(req.headers.authorization?.startswith('Bearer')) {
            token = req.headers.authorization.split('')[1];
        }
        if(!token) {
            return next(new AppError('Not Authorized', 401))
        }
        const deleted: any = jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (error) {
        
    }
}