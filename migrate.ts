import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure the database directory exists
const dbDir = path.join(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Use an absolute path for the database file
const sqlite = new Database(path.join(dbDir, "sqlite.db"));
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
