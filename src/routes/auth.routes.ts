import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../handlers/auth.handler";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/logout", logoutHandler);
authRouter.post("/register", registerHandler);

export default authRouter;
