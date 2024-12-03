import { Databases } from "node-appwrite";
import { ID } from "node-appwrite";

import { tasksExample, statusColumnExample } from "@/lib/exampleData";

import {
  DATABASE_ID,
  BOARDS_ID,
  STATUS_COLUMN_ID,
  TASKS_ID,
  SUB_TASKS_ID,
} from "@/config";

import { MAX_SUB_TASKS } from "@/features/board/constants";

export async function initializeBoardDataExample(
  databases: Databases,
  userId: string,
) {
  try {
    const boardId = ID.unique();
    const boardName = "Example Board";

    const boardPromise = await databases.createDocument(
      DATABASE_ID,
      BOARDS_ID,
      boardId,
      {
        boardName,
        userId,
      },
    );

    const statusColumnsData: Record<string, unknown> = {
      boardId,
    };

    statusColumnExample.forEach((status, index) => {
      statusColumnsData[`column_${index}`] = status.statusName;
    });

    const columnsPromise = await databases.createDocument(
      DATABASE_ID,
      STATUS_COLUMN_ID,
      ID.unique(),
      statusColumnsData,
    );

    await Promise.all([boardPromise, columnsPromise]);

    for (const task of tasksExample) {
      const { taskName, description, position, priority, statusId, subtasks } =
        task;

      const subtaskData: Record<string, unknown> = { boardId };
      const subtasksArray = subtasks || [];

      subtasksArray.forEach((subtask, index) => {
        subtaskData[`subtask_${index}`] = subtask.title || "";
        subtaskData[`subtask_check_${index}`] = subtask.isCompleted || false;
      });

      for (let i = subtasksArray.length; i < MAX_SUB_TASKS; i++) {
        subtaskData[`subtask_${i}`] = "";
        subtaskData[`subtask_check_${i}`] = null;
      }

      const subtasksId = ID.unique();

      const subtasksPromise = databases.createDocument(
        DATABASE_ID,
        SUB_TASKS_ID,
        subtasksId,
        subtaskData,
      );

      const taskPromise = databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          boardId,
          taskName,
          description: description || "",
          position,
          priority,
          subtasksId,
          columnId: statusId,
        },
      );

      await Promise.all([subtasksPromise, taskPromise]);
    }
  } catch (error) {
    console.error("Error initializing board data example:", error);
    throw error;
  }
}
