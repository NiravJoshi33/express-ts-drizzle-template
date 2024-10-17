import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./001-users-table";
import { SESSION_EXPIRATION_TIME_IN_MS } from "../../utils/env-vars";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
