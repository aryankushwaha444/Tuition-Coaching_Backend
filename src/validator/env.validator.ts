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
  DATABASE_URL: string;
  LOG_LEVEL: "error" | "warn" | "info";
}

// ------------------------------------------------------
// envSchema{} — Environment variable schema
// ------------------------------------------------------
const envSchema = Joi.object<EnvSchema>({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  LOG_LEVEL: Joi.string().valid("error", "warn", "info").default("info"),
});

export default envSchema;
