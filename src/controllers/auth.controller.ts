import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";



export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser) {
            // return res.status(400).json({success: true, message: 'email is required'})
            return next(new AppError('User already exists', 400))
        }

        const user = await User.create({name, email, password})
        const token = generateToken(user.id.toString())
        
        res.status(201).json({success: true, token})

    } catch (error) {
        next(error)
    }
}

export const login = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {password, email} = req.body

        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return next(new AppError('Invalid credentials', 401))
        }
        const token = generateToken(user.id.toString())
        res.json({success: true, token})
    } catch (error) {
        next(error)
    }
}