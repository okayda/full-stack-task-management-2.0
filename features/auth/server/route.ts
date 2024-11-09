import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";

import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";

import { createUserSchema } from "../schemas";
import { AUTH_COOKIE } from "../constants";

const app = new Hono().post(
  "/create",
  zValidator("json", createUserSchema),
  async function (c) {
    const { username, email, password } = c.req.valid("json");

    // Your information here is handled by Appwrite I don't handle it, especially your PASSWORD.

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, username);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  },
);

export default app;
