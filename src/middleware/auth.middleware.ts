import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import { validateSession } from "../utils/auth-utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.signedCookies.session_token;

  if (!sessionToken) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Unauthorized",
    };
    res.status(401).json(response);
    return;
  }

  try {
    const sessionValidation = await validateSession(sessionToken);

    if (!sessionValidation.session) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Unauthorized",
      };
      res.status(401).json(response);
      return;
    }
    // Attach the user to the request object
    (req as any).user = sessionValidation.user;

    next();
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Internal server error",
    };
    res.status(500).json(response);
    return;
  }
};
