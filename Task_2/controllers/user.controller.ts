import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { db } from "../utils/prisma";
import ErrorHandler from "../utils/ErrorHandler";

export const myInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await db.user.findFirst({ where: { user_id: req.user?.user_id } })
        if (!user) {
            return next(new ErrorHandler("You aren't logged in", 401))
        }
        res.status(200).json(user)
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})