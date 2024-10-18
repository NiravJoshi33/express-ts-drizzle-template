import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Dashboard");
  }
);

export default dashboardRouter;
