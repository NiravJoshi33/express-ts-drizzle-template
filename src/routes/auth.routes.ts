import { Router } from "express";
import { loginHandler, logoutHandler } from "../handlers/auth.handler";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/logout", logoutHandler);

export default authRouter;
