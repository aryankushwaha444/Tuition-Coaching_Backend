import { config } from "dotenv";
config({});

export const {
    PORT,
    JWT_REFRESH_SECRET,
    JWT_SECRET
} = process.env;
