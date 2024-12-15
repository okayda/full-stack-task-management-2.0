import { z } from "zod";

import { TaskPriority } from "./types";

import { MAX_SUB_TASKS } from "./constants";

export const createBoardSchema = z.object({
  boardName: z.string().trim().min(1),
});

export const taskSchema = z.object({
  boardId: z.string().trim().min(1),
  taskName: z.string().trim().min(1),
  statusId: z.string().trim(),
  priority: z.nativeEnum(TaskPriority),
  description: z.string().trim().optional(),
  subtasks: z
    .array(
      z.object({
        subtaskName: z.string().trim().optional(),
        isCompleted: z.boolean().optional(),
      }),
    )
    .max(MAX_SUB_TASKS),
});

// only use in the back-end only
export const updateTaskSchema = taskSchema.extend({
  taskId: z.string().trim().min(1),
  subtasksId: z.string().trim().min(1),
});
