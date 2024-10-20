import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { COOKIE_SECRET } from "./utils/env-vars";
import { corsOptions, PREFIX } from "./utils/config";
import router from "./routes";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import { unknownRouteMiddleware } from "./middleware/unknown-route.middleware";

const app = express();

// Middleware

app.use(helmet());
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" })); // Parse URL-encoded bodies

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.disable("x-powered-by"); // Reduce fingerprinting

app.use(PREFIX, router);

app.use(unknownRouteMiddleware);
app.use(errorHandlerMiddleware);

export default app;
