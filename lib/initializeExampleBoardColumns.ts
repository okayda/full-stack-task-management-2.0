import { Databases } from "node-appwrite";
import { ID } from "node-appwrite";

import {
  boardNameExampleColumns,
  statusColumnExample,
} from "@/lib/exampleBoardData";

import { DATABASE_ID, BOARDS_ID, STATUS_COLUMN_ID } from "@/config";

export async function initializeExampleBoardColumns(
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
        boardName: boardNameExampleColumns,
        userId,
      },
    );

    const statusColumnObj: Record<string, string> = { boardId };

    statusColumnExample.forEach((column, i) => {
      statusColumnObj[`column_${i}_id`] = column.statusId;
      statusColumnObj[`column_${i}`] = column.statusName;
    });

    const columnsPromise = databases.createDocument(
      DATABASE_ID,
      STATUS_COLUMN_ID,
      ID.unique(),
      statusColumnObj,
    );

    await Promise.all([boardPromise, columnsPromise]);
  } catch (error) {
    console.error("Error initializing example board columns:", error);
    throw error;
  }
}
