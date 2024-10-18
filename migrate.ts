import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { DATABASE_URL } from "./src/utils/env-vars";

// Ensure the database directory exists
const dbDir = path.join(__dirname, DATABASE_URL);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Use an absolute path for the database file
const sqlite = new Database(DATABASE_URL);
const db = drizzle(sqlite);

async function main() {
  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: path.join(__dirname, "drizzle") });

  console.log("Migrations completed successfully");

  process.exit(0);
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
