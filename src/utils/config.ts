import { CorsOptions } from "cors";
import { NODE_ENV } from "./env-vars";

export const corsOptions: CorsOptions = {
  origin:
    NODE_ENV === "production"
      ? "https://your-frontend-app.com"
      : "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

export const PREFIX = "/api/v1";
