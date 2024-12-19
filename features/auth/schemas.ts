import { z } from "zod";
import { USERNAME_CHARACTERS, PASSWORD_CHARACTERS } from "./constants";

export const loginUserSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(PASSWORD_CHARACTERS, "Minimum of 8 characters"),
});

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(USERNAME_CHARACTERS, "Minimum of 3 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(PASSWORD_CHARACTERS, "Minimum of 8 characters"),
});
