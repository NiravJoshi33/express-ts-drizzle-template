import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    // If headers have been sent, let Express handle the error
    return next(err);
  }

  res.status(500).json({ message: err.message });
};
