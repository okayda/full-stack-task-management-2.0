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
