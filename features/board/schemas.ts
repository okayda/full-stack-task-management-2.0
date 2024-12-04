import { z } from "zod";
import { TaskPriority } from "./types";

export const createBoardSchema = z.object({
  boardName: z.string().trim().min(1, "Required"),
});

export const createTaskSchema = z.object({
  boardId: z.string().trim().min(1, "Required"),
  taskName: z.string().trim().min(1, "Required"),
  statusId: z.string().trim(),
  priority: z.nativeEnum(TaskPriority, {
    errorMap: () => ({ message: "Invalid" }),
  }),
  description: z.string().optional(),
  subtasks: z
    .array(
      z.object({
        value: z.string().trim().optional(),
      }),
    )
    .max(5, "Only 5 subtasks allowed"),
});
