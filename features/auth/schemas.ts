import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(8, "Minimum of 8 characters"),
});

export const createUserSchema = z.object({
  username: z.string().trim().min(3, "Minimum of 3 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(8, "Minimum of 8 characters"),
});
