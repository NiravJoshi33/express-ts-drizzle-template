import { InferSelectModel } from "drizzle-orm";
import { users } from "./001-users-table";

export const dbSchema = {
  users,
};

export type Users = InferSelectModel<typeof users>;
