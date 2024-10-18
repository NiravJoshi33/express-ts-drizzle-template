import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../models/auth.models";
import { ApiResponse } from "../models/api-response.model";
import {
  createSession,
  generateSessionToken,
  invalidateSession,
  validateSession,
  verifyUserCredentials,
} from "../utils/auth-utils";
import { Session, User } from "../db/schema";
import { NODE_ENV, SESSION_EXPIRATION_TIME_IN_MS } from "../utils/env-vars";

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Invalid input",
        errors: result.error.errors.map((error) => error.message),
      };

      res.status(400).json(response);
      return;
    }

    // Get session token from request
    const sessionToken = req.signedCookies.session_token;

    if (!sessionToken) {
      const user = await verifyUserCredentials(email, password);
      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Invalid credentials",
        };

        res.status(400).json(response);
        return;
      }

      const sessionToken = await generateSessionToken();
      const session = await createSession(sessionToken, user.id);

      res.cookie("session_token", sessionToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: SESSION_EXPIRATION_TIME_IN_MS,
        signed: true,
      });

      const response: ApiResponse<Session> = {
        success: true,
        message: "User logged in successfully",
        data: session,
      };

      res.status(200).json(response);
      return;
    }

    // Check if session token is valid
    const sessionValidation = await validateSession(sessionToken);

    if (!sessionValidation.session) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Invalid session token",
      };

      res.status(400).json(response);
      return;
    }

    const user = sessionValidation.user;

    const response: ApiResponse<User> = {
      success: true,
      message: "User logged in successfully",
      data: user,
    };

    res.status(200).json(response);
    return;
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.signedCookies.session_token;
    if (!sessionToken) {
      const response: ApiResponse<null> = {
        success: false,
        message: "No session token found",
      };

      res.status(400).json(response);
      return;
    }

    await invalidateSession(sessionToken);

    const response: ApiResponse<null> = {
      success: true,
      message: "User logged out successfully",
    };

    res.status(200).json(response);
    return;
  } catch (error) {
    next(error);
  }
};
