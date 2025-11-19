// ============================================================
// 🧩 EnvValidator — Environment variable validation
// ============================================================
import Joi from "joi";

// ------------------------------------------------------
// Env schema interface
// ------------------------------------------------------
export interface EnvSchema {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  APP_VERSION: string;
  DATABASE_URL: string;
  LOG_LEVEL: "error" | "warn" | "info";
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION: string;
}

// ------------------------------------------------------
// envSchema{} — Environment variable schema
// ------------------------------------------------------
const envSchema = Joi.object<EnvSchema>({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  PORT: Joi.number().default(3000),
  APP_VERSION: Joi.string().default("1.0.0"),
  DATABASE_URL: Joi.string().uri().required(),
  LOG_LEVEL: Joi.string().valid("error", "warn", "info").default("info"),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().min(20).required(),
  JWT_ACCESS_TOKEN_EXPIRATION: Joi.string().default("15m"),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().min(20).required(),
  JWT_REFRESH_TOKEN_EXPIRATION: Joi.string().default("7d"),
});

export default envSchema;
