import { Models } from "node-appwrite";

export enum TaskPriority {
  HIGHEST = "HIGHEST",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  LOWEST = "LOWEST",
}

export type StatusColumnItem = {
  statusName: string;
  statusId: string;
};

export type StatusColumn = {
  columns: StatusColumnItem[];
};

export type Task = Models.Document & {
  boardId: string; // appwrite referential id
  statusId: string;
  position: number;
  taskName: string;
  description?: string;
  priority: TaskPriority;
  subtasksId: string; // appwrite referential id
};

export type BoardData = {
  statusColumn: StatusColumnItem[];
  tasks: Task[];
};

export type SubTask = {
  subtaskName: string;
  isCompleted: boolean;
};

export type StatusColumnDocument = Models.Document & {
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

export type SubtasksDocument = Models.Document & {
  boardId: string;
  subtask_0?: string | null;
  subtask_1?: string | null;
  subtask_2?: string | null;
  subtask_3?: string | null;
  subtask_4?: string | null;
  subtask_check_0?: boolean | null;
  subtask_check_1?: boolean | null;
  subtask_check_2?: boolean | null;
  subtask_check_3?: boolean | null;
  subtask_check_4?: boolean | null;
};
