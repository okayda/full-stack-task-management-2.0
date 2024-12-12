import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { ID, Query } from "node-appwrite";

import {
  BOARDS_ID,
  DATABASE_ID,
  STATUS_COLUMN_ID,
  SUB_TASKS_ID,
  TASKS_ID,
} from "@/config";

import { sessionMiddleware } from "@/lib/session-middleware";

import { initializeBoardDataExample } from "@/lib/initializeBoardDataExample";

import { createBoardSchema, createTaskSchema } from "../schemas";

import { MAX_COLUMNS, MAX_SUB_TASKS } from "../constants";

import {
  StatusColumnItem,
  Task,
  UpdatedTask,
  StatusColumnDoc,
  SubtasksDoc,
} from "../types";

const app = new Hono()
  .post(
    "/create-board",
    sessionMiddleware,
    zValidator("json", createBoardSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { boardName } = c.req.valid("json");

      const boardId = ID.unique();

      const board = await databases.createDocument(
        DATABASE_ID,
        BOARDS_ID,
        boardId,
        {
          boardName,
          userId: user.$id,
        },
      );

      return c.json({ board });
    },
  )
  .post(
    "/create-task",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const databases = c.get("databases");

      const { boardId, taskName, statusId, priority, description, subtasks } =
        c.req.valid("json");

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("boardId", boardId),
          Query.orderAsc("position"),
          Query.limit(1),
        ],
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const subtaskData: Record<string, unknown> = { boardId };

      subtasks.forEach((subtask, index) => {
        subtaskData[`subtask_${index}`] = subtask.value || "";
        subtaskData[`subtask_check_${index}`] = subtask.value ? false : null;
      });

      for (let i = subtasks.length; i < MAX_SUB_TASKS; i++) {
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
          statusId,
          priority,
          description: description || "",
          subtasksId,
          position: newPosition,
        },
      );

      const [subtasksDocument, task] = await Promise.all([
        subtasksPromise,
        taskPromise,
      ]);

      return c.json({ task, subtasks: subtasksDocument });
    },
  )
  .post("/create-board-data-example", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const data = await initializeBoardDataExample(databases, user.$id);

    return c.json({ data });
  })
  .get("/get-tasks", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const boardId = c.req.query("boardId");

    if (!boardId) {
      return c.json(
        {
          error:
            "Failed to get the board tasks since the boardId is not provided",
        },
        404,
      );
    }

    const [statusColumnRes, tasksRes] = await Promise.all([
      databases.listDocuments<StatusColumnDoc>(DATABASE_ID, STATUS_COLUMN_ID, [
        Query.equal("boardId", boardId),
      ]),
      databases.listDocuments<Task>(DATABASE_ID, TASKS_ID, [
        Query.equal("boardId", boardId),
      ]),
    ]);

    const statusColumnDoc = statusColumnRes.documents[0];
    const tasks = tasksRes.documents;

    if (tasks.length === 0) {
      const fallbackBoardId = statusColumnDoc?.boardId || boardId;

      return c.json({
        statusColumn: {
          boardId: fallbackBoardId,
          columns: [],
        },
        tasks: [],
      });
    }

    const subtasksIds = tasks
      .map((task) => task.subtasksId)
      .filter((id): id is string => Boolean(id));

    const subtasksPromises = subtasksIds.map((id) =>
      databases.getDocument<SubtasksDoc>(DATABASE_ID, SUB_TASKS_ID, id),
    );

    const subtasksDocs = await Promise.all(subtasksPromises);

    const subtasksMap = new Map<string, SubtasksDoc>();
    for (const doc of subtasksDocs) {
      subtasksMap.set(doc.$id, doc);
    }

    const columns: StatusColumnItem[] = [];
    let finalBoardId = boardId;

    if (statusColumnDoc) {
      finalBoardId = statusColumnDoc.boardId;
      for (let i = 0; i < MAX_COLUMNS; i++) {
        const columnName =
          statusColumnDoc[`column_${i}` as keyof StatusColumnDoc];

        const statusId = statusColumnDoc[
          `column_${i}_id` as keyof StatusColumnDoc
        ] as string | undefined;

        if (typeof columnName === "string" && columnName.trim() !== "") {
          columns.push({
            statusName: columnName,
            statusId: statusId || "",
          });
        }
      }
    }

    const updatedTasks: UpdatedTask[] = tasks.map((task) => {
      const subtasksDoc = subtasksMap.get(task.subtasksId);

      const taskSubtasks: { title: string; isCompleted: boolean }[] = [];

      if (subtasksDoc) {
        for (let i = 0; i < MAX_SUB_TASKS; i++) {
          const subName = subtasksDoc[`subtask_${i}` as keyof SubtasksDoc];

          const subCheck =
            subtasksDoc[`subtask_check_${i}` as keyof SubtasksDoc];

          if (typeof subName === "string" && subName.trim() !== "") {
            taskSubtasks.push({
              title: subName,
              isCompleted: subCheck === true,
            });
          }
        }
      }

      return {
        ...task,
        subtasks: taskSubtasks,
      };
    });

    return c.json({
      statusColumn: {
        boardId: finalBoardId,
        columns,
      },
      tasks: updatedTasks,
    });
  });

export default app;
