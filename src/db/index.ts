import { drizzle } from "drizzle-orm/better-sqlite3";
import { DATABASE_URL } from "../utils/env-vars";
import { dbSchema } from "./schema";

const db = drizzle(DATABASE_URL, { schema: dbSchema });
