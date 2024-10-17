import { drizzle } from "drizzle-orm/better-sqlite3";
import { DATABASE_URL } from "../utils/env-vars";
import { dbSchema } from "./schema";

const db = drizzle(DATABASE_URL, { schema: dbSchema });

const connectToDb = async () => {
  try {
    await db.select().from(dbSchema.users); // Test the connection
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export { db, connectToDb };
