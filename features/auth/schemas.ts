import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum of 6 characters"),
});

export const createUserSchema = z.object({
  username: z.string().trim().min(3, "Please enter your username"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum of 6 characters"),
});
