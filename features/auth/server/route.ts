import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";

import { ID } from "node-appwrite";

import { createAdminClient } from "@/lib/appwrite";

import { createUserSchema, loginUserSchema } from "../schemas";
import { AUTH_COOKIE } from "../constants";

// Your information here is handled by Appwrite & Hono.js I dont handle it especially your PASSWORD
const app = new Hono()
  .post("/create", zValidator("json", createUserSchema), async function (c) {
    try {
      const { username, email, password } = c.req.valid("json");

      const { account } = await createAdminClient();

      await account.create(ID.unique(), email, password, username);

      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 15,
      });

      return c.json({ success: true });
    } catch (error) {
      console.error("Server auth account creation error:", error);
      return c.json(
        {
          success: false,
          message: "Email already in use. Please use a different email.",
        },
        409,
      );
    }
  })
  .post("/login", zValidator("json", loginUserSchema), async function (c) {
    try {
      const { email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 15,
      });

      return c.json({ success: true });
    } catch (error) {
      console.error("Server auth account login error:", error);
      return c.json(
        {
          success: false,
          message: "Failed to verify account",
        },
        401,
      );
    }
  });

export default app;
