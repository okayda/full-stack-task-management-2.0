import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Please enter your username"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum of 6 characters"),
});
