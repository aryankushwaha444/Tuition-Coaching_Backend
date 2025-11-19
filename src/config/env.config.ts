// ============================================================
// 🧩 EnvConfig — Environment configuration
// ============================================================
import "dotenv/config";
import validate from "@/lib/validate.lib";
import envSchema from "@/validator/env.validator";

// ------------------------------------------------------
// envConfig{} — Environment configuration object
// ------------------------------------------------------
const envConfig = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	APP_VERSION: process.env.APP_VERSION,
	DATABASE_URL: process.env.DATABASE_URL,
	LOG_LEVEL: process.env.LOG_LEVEL,
	JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
	JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
	JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
};

// Configure and validate the environment variables
const config = validate(envSchema, envConfig);

export default config;
