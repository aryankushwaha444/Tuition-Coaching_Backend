import { NextFunction } from "express";
import { userCreateSchema } from "../validators/user.validator";
import ErrorHandler from "../utils/ErrorHandler";
import { addUser } from "../repositories/user.repository";
import { db } from "../utils/prisma";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const registerUserService = async (data: any, next: NextFunction) => {
    try {
        const { error, value } = userCreateSchema.validate(data)
        if (!error) {
            const hashedPassword = await bcrypt.hash(value.password, 10);
            return await addUser({ ...value, password: hashedPassword })
        }
        else if (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
}

export const loginUserService = async (data: any, next: NextFunction) => {
    try {
        const { email, password } = data;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        const user = await db.user.findUnique({ where: { email } });

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { user, accessToken, refreshToken };
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
};