import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { registerUserService, loginUserService } from "../services/auth.service";
import { getUserById } from "../repositories/user.repository";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt";

import { JWT_REFRESH_SECRET, NODE_ENV } from "../config/config.env";

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            return next(new ErrorHandler("Please enter the fields", 400))
        }

        const newUser = await registerUserService(req.body)

        res.status(201).json({
            message: "New User Created Successfully",
            newUser: { ...newUser, password: "" }
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await loginUserService(req.body);
        if (result) {
            res.cookie("access_token", result.access_token, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie("refresh_token", result.refresh_token, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                success: true,
                user: { ...result.user, password: "" }
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const refreshToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.refresh_token;

        if (!token) {
            return next(new ErrorHandler("Refresh Token is required", 400));
        }

        const decoded: any = jwt.verify(token, JWT_REFRESH_SECRET || "refresh_secret");

        const user = await getUserById(decoded.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const access_token = generateAccessToken(user);

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.status(200).json({
            success: true,
            message: "New access token generated"
        });
    } catch (error: any) {
        return next(new ErrorHandler("Invalid Refresh Token", 403));
    }
});