import { dbSchema, Session, User } from "../db/schema";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { SESSION_EXPIRATION_TIME_IN_MS } from "./env-vars";
import { db } from "../db";
import { eq } from "drizzle-orm";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (token: string, userId: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId: userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME_IN_MS),
  };
  try {
    await db.insert(dbSchema.sessions).values(session);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const validateSession = async (
  token: string
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  try {
    const existingSession = await db
      .select({ user: dbSchema.users, session: dbSchema.sessions })
      .from(dbSchema.sessions)
      .innerJoin(
        dbSchema.users,
        eq(dbSchema.sessions.userId, dbSchema.users.id)
      )
      .where(eq(dbSchema.sessions.id, sessionId));

    if (existingSession.length < 1) {
      return { session: null, user: null };
    }

    const { user, session } = existingSession[0];

    if (Date.now() >= session.expiresAt.getTime()) {
      await db
        .delete(dbSchema.sessions)
        .where(eq(dbSchema.sessions.id, session.id));
      return { session: null, user: null };
    }

    if (
      Date.now() >=
      session.expiresAt.getTime() - SESSION_EXPIRATION_TIME_IN_MS / 2
    ) {
      session.expiresAt = new Date(Date.now() + SESSION_EXPIRATION_TIME_IN_MS);
      await db
        .update(dbSchema.sessions)
        .set({ expiresAt: session.expiresAt })
        .where(eq(dbSchema.sessions.id, session.id));

      return { session, user };
    }

    return { session, user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const invalidateSession = async (sessionId: string) => {
  try {
    await db
      .delete(dbSchema.sessions)
      .where(eq(dbSchema.sessions.id, sessionId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyUserCredentials = async (
  email: string,
  password: string
) => {
  const existingUser = await db
    .select()
    .from(dbSchema.users)
    .where(eq(dbSchema.users.email, email));
  if (existingUser.length < 1) {
    return null;
  }
  const user = existingUser[0];
  const passwordMatch = password === user.password;
  return passwordMatch ? user : null;
};
