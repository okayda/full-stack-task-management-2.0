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

import { MAX_SUB_TASKS, MAX_COLUMNS } from "@/features/board/constants";

export async function initializeBoardDataExample(
  databases: Databases,
  userId: string,
) {
  try {
    const boardId = ID.unique();
    const boardName = "Example Board";

    const boardPromise = databases.createDocument(
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

    // Iterate through `statusColumnExample` and assign values or `null` for missing values
    statusColumnExample.forEach((status, index) => {
      statusColumnsData[`column_${index}`] = status.statusName || null;
      statusColumnsData[`column_${index}_id`] = status.statusId || null;
    });

    // Ensure attributes for all columns exist, even if not provided in `statusColumnExample`
    for (let i = statusColumnExample.length; i < MAX_COLUMNS; i++) {
      statusColumnsData[`column_${i}`] = null;
      statusColumnsData[`column_${i}_id`] = null;
    }

    const columnsPromise = databases.createDocument(
      DATABASE_ID,
      STATUS_COLUMN_ID,
      ID.unique(),
      statusColumnsData,
    );

    await Promise.all([boardPromise, columnsPromise]);

    // Loop through tasksExample to create tasks and subtasks
    for (const task of tasksExample) {
      const { taskName, description, position, priority, statusId, subtasks } =
        task;

      const subtaskData: Record<string, unknown> = { boardId };
      const subtasksArray = subtasks || [];

      // Populate subtasks or set to empty strings/null if missing
      subtasksArray.forEach((subtask, index) => {
        subtaskData[`subtask_${index}`] = subtask.title || "";
        subtaskData[`subtask_check_${index}`] = subtask.isCompleted || false;
      });

      // Fill in remaining subtasks as null/empty
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
          statusId,
        },
      );

      await Promise.all([subtasksPromise, taskPromise]);
    }
  } catch (error) {
    console.error("Error initializing board data example:", error);
    throw error;
  }
}
