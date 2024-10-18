import { Router } from "express";
import { loginHandler } from "../handlers/auth.handler";

const authRouter = Router();

authRouter.post("/login", loginHandler);

export default authRouter;
