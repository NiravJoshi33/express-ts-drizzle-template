import { Router } from "express";
import { PREFIX } from "../utils/config";
import authRouter from "./auth.routes";

const router = Router();

router.use("/auth", authRouter);

export default router;
