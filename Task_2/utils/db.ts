import { db } from "./prisma";

export async function checkDBConnection() {
  try {
    await db.$queryRaw`SELECT 1`;
    console.log("Db Connected");
    return true;
  } catch (error: any) {
    console.error("Database connection check failed:", error.message || error);
    return false;
  }
}
