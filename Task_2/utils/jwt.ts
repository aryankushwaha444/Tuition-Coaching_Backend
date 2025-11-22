import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/config.env";

export const generateAccessToken = (user: any) => {
    return jwt.sign(
        { id: user.user_id, role: user.role },
        JWT_SECRET || "secret",
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (user: any) => {
    return jwt.sign(
        { id: user.user_id },
        JWT_REFRESH_SECRET || "refresh_secret",
        { expiresIn: "7d" }
    );
};
