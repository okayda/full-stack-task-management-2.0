import { Models } from "node-appwrite";

export enum TaskPriority {
  HIGHEST = "HIGHEST",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  LOWEST = "LOWEST",
}

export type StatusColumn = {
  statusId: string;
  statusName: string;
};

export type Task = Models.Document & {
  boardId: string; // appwrite referential id
  statusId: string;
  statusName: string;
  position: number;
  taskName: string;
  description?: string;
  priority: TaskPriority;
  subtasksId: string; // appwrite referential id
};

export type StatusColumnDoc = Models.Document & {
  boardId: string;
  column_0?: string | null;
  column_0_id?: string | null;
  column_1?: string | null;
  column_1_id?: string | null;
  column_2?: string | null;
  column_2_id?: string | null;
  column_3?: string | null;
  column_3_id?: string | null;
  column_4?: string | null;
  column_4_id?: string | null;
};

export type SubtasksDoc = Models.Document & {
  boardId: string;
  subtask_0?: string;
  subtask_1?: string;
  subtask_2?: string;
  subtask_3?: string;
  subtask_4?: string;
  subtask_check_0?: boolean;
  subtask_check_1?: boolean;
  subtask_check_2?: boolean;
  subtask_check_3?: boolean;
  subtask_check_4?: boolean;
};

export type UpdatedTask = Task & {
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
};
