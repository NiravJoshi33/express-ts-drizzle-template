import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const SESSION_EXPIRATION_TIME_IN_MS =
  (Number(process.env.SESSION_EXPIRATION_TIME_IN_DAYS) || 30) *
  24 *
  60 *
  60 *
  1000;
export const DATABASE_URL =
  NODE_ENV === "production"
    ? (process.env.PROD_DB_URL as string)
    : (process.env.DEV_DB_URL as string);

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
