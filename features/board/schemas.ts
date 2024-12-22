import { z } from "zod";

import { TaskPriority } from "./types";

import { MAX_SUB_TASKS } from "./constants";

export const createBoardSchema = z.object({
  boardName: z.string().trim().min(1),
});

export const createColumnSchema = z.object({
  boardId: z.string().trim(),
  statusName: z.string().trim().min(1),
});

export const settingColumnSchema = z.object({
  boardId: z.string().trim(),
  boardName: z.string().trim().min(1),
  statusColumn: z
    .array(
      z.object({
        statusId: z.string().trim(),
        statusName: z.string().trim().min(1),
      }),
    )
    .refine(
      (columns) =>
        columns.filter((col) => col.statusName.trim() !== "").length >= 2,
      {
        message: "At least 2 columns must have non empty names.",
      },
    ),
});

export const taskSchema = z.object({
  boardId: z.string().trim(),
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

// should be use in the back-end only
export const updateTaskSchema = taskSchema.extend({
  taskId: z.string().trim(),
  subtasksId: z.string().trim(),
});

// should be use in the back-end only
export const updateSubtasksSchema = z.object({
  boardId: z.string().trim(),
  subtasksId: z.string().trim(),
  taskId: z.string().trim(),
  statusId: z.string().trim(),
  subtasks: z
    .array(
      z.object({
        subtaskName: z.string().trim().optional(),
        isCompleted: z.boolean().optional(),
      }),
    )
    .max(MAX_SUB_TASKS),
});

// should be use in the back-end only
export const deleteTaskSchema = z.object({
  boardId: z.string().trim(),
  taskId: z.string().trim(),
});
