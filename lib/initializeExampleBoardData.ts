import { Databases } from "node-appwrite";
import { ID } from "node-appwrite";

import {
  boardNameExampleData,
  statusColumnExample,
  tasksExample,
} from "@/lib/exampleBoardData";

import {
  DATABASE_ID,
  BOARDS_ID,
  STATUS_COLUMN_ID,
  TASKS_ID,
  SUB_TASKS_ID,
} from "@/config";

export async function initializeBoardDataExample(
  databases: Databases,
  userId: string,
) {
  try {
    const boardId = ID.unique();

    const boardPromise = databases.createDocument(
      DATABASE_ID,
      BOARDS_ID,
      boardId,
      {
        boardName: boardNameExampleData,
        userId,
      },
    );

    const statusColumnObj: Record<string, string> = {
      boardId,
    };

    statusColumnExample.forEach((status, i) => {
      statusColumnObj[`column_${i}_id`] = status.statusId;
      statusColumnObj[`column_${i}`] = status.statusName;
    });

    const columnsPromise = databases.createDocument(
      DATABASE_ID,
      STATUS_COLUMN_ID,
      ID.unique(),
      statusColumnObj,
    );

    await Promise.all([boardPromise, columnsPromise]);

    for (const task of tasksExample) {
      const { taskName, description, position, priority, statusId, subtasks } =
        task;

      const subtaskObj: Record<string, string | boolean> = { boardId };

      subtasks.forEach((subtask, i) => {
        subtaskObj[`subtask_${i}`] = subtask.subtaskName;
        subtaskObj[`subtask_check_${i}`] = subtask.isCompleted;
      });

      const subtasksId = ID.unique();

      const taskPromise = databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          boardId,
          taskName,
          description,
          position,
          priority,
          subtasksId,
          statusId,
        },
      );

      const subtasksPromise = databases.createDocument(
        DATABASE_ID,
        SUB_TASKS_ID,
        subtasksId,
        subtaskObj,
      );

      await Promise.all([taskPromise, subtasksPromise]);
    }
  } catch (error) {
    console.error("Error initializing example board data:", error);
    throw error;
  }
}
