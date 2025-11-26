import { config } from "dotenv";
config({});

export const {
    PORT,
    JWT_REFRESH_SECRET,
    JWT_SECRET,
    NODE_ENV,
    DATABASE_URL,
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,

} = process.env;
