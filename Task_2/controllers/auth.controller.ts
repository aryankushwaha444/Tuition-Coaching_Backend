import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { registerUserService, loginUserService } from "../services/auth.service";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt";
import { db } from "../utils/prisma";

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            return next(new ErrorHandler("Please enter the fields", 400))
        }
        const newUser = await registerUserService(req.body, next)
        res.status(201).json({ message: "New User Created Successfully", newUser: { ...newUser, password: "" } })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await loginUserService(req.body, next);
        if (result) {
            res.status(200).json({
                success: true,
                user: { ...result.user, password: "" },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const refreshToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;

        if (!token) {
            return next(new ErrorHandler("Refresh Token is required", 400));
        }

        const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "refresh_secret");

        const user = await db.user.findUnique({ where: { user_id: decoded.id } });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const accessToken = generateAccessToken(user);

        res.status(200).json({
            success: true,
            accessToken
        });
    } catch (error: any) {
        return next(new ErrorHandler("Invalid Refresh Token", 403));
    }
});