import { Request, Response } from "express";
import { loginSchema } from "../models/auth.models";
import { ApiResponse } from "../models/api-response.model";
import {
  createSession,
  generateSessionToken,
  validateSession,
  verifyUserCredentials,
} from "../utils/auth-utils";
import { Session, User } from "../db/schema";
import { NODE_ENV, SESSION_EXPIRATION_TIME_IN_MS } from "../utils/env-vars";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Invalid input",
      errors: result.error.errors.map((error) => error.message),
    };

    return res.status(400).json(response);
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

      return res.status(400).json(response);
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

    return res.status(200).json(response);
  }

  // Check if session token is valid
  const sessionValidation = await validateSession(sessionToken);

  if (!sessionValidation.session) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Invalid session token",
    };

    return res.status(400).json(response);
  }

  const user = sessionValidation.user;

  const response: ApiResponse<User> = {
    success: true,
    message: "User logged in successfully",
    data: user,
  };

  return res.status(200).json(response);
};
