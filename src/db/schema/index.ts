import { InferSelectModel } from "drizzle-orm";
import { users } from "./001-users-table";
import { sessions } from "./002-sessions-table";

export const dbSchema = {
  users,
  sessions,
};

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
