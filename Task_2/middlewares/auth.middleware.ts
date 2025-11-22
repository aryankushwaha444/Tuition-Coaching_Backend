import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { db } from "../utils/prisma";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";

export const isAuthenticated = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

    const user = await db.user.findUnique({
        where: { user_id: decoded.id }
    });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
});

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
