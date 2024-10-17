import { Config } from "drizzle-kit";
import { DATABASE_URL } from "./src/utils/env-vars";

export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
