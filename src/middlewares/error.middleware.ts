import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";


export const globalErrorHandler = (err: any, req: Request, res:Response, next: NextFunction) => {
    console.log("ERROR 💥", err)

    // Invalid Mongo ID 
    if(err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false, message: 'Invalid MongoDB ID'
        })
    }
    // Duplicate key error
    if(err.code == 11000) {
        return res.status(400).json({success: false, message: 'Duplicate field value entered'})
    }
    // Custom AppError
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })
    }
    // Default
    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}