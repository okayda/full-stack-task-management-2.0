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

import { initializeBoardDataExample } from "@/lib/initializeExampleBoardData";

import {
  createBoardSchema,
  updateColumnSchema,
  taskSchema,
  updateTaskSchema,
  updateSubtasksSchema,
} from "../schemas";

import { VALID_STATUS_ID, MAX_COLUMNS, MAX_SUB_TASKS } from "../constants";

import {
  Task,
  StatusColumnItem,
  SubtasksDocument,
  StatusColumnDocument,
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
    "/create-column",
    sessionMiddleware,
    zValidator("json", updateColumnSchema),
    async (c) => {
      const databases = c.get("databases");
      const { boardId, statusName } = c.req.valid("json");

      const columnDocument = await databases.listDocuments(
        DATABASE_ID,
        STATUS_COLUMN_ID,
        [Query.equal("boardId", boardId), Query.limit(1)],
      );

      if (columnDocument.total === 0) {
        return c.json({ error: "No matching status column found" }, 404);
      }

      const columns = columnDocument.documents[0];

      const usedStatusIds = [
        columns.column_0_id,
        columns.column_1_id,
        columns.column_2_id,
        columns.column_3_id,
        columns.column_4_id,
      ].filter(Boolean);

      const availableStatusId = VALID_STATUS_ID.find(
        (id) => !usedStatusIds.includes(id),
      );

      if (!availableStatusId) {
        return c.json({ error: "No more available columns to add." }, 400);
      }

      const indexToFill = VALID_STATUS_ID.indexOf(availableStatusId);

      const columnData: Record<string, unknown> = { boardId };
      columnData[`column_${indexToFill}`] = statusName;
      columnData[`column_${indexToFill}_id`] = availableStatusId;

      const updated = await databases.updateDocument(
        DATABASE_ID,
        STATUS_COLUMN_ID,
        columns.$id,
        columnData,
      );

      return c.json({ board: updated });
    },
  )
  .post(
    "/create-task",
    sessionMiddleware,
    zValidator("json", taskSchema),
    async (c) => {
      const databases = c.get("databases");

      const { boardId, taskName, statusId, priority, description, subtasks } =
        c.req.valid("json");

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("boardId", boardId),
          Query.orderDesc("position"),
          Query.limit(1),
        ],
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const subtaskData: Record<string, unknown> = { boardId };

      subtasks.forEach((subtask, index) => {
        subtaskData[`subtask_${index}`] = subtask.subtaskName;
        subtaskData[`subtask_check_${index}`] = subtask.isCompleted;
      });

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
          description,
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
  .post("/create-example-board-data", sessionMiddleware, async (c) => {
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

    const [statusColumnData, tasksData] = await Promise.all([
      databases.listDocuments<StatusColumnDocument>(
        DATABASE_ID,
        STATUS_COLUMN_ID,
        [Query.equal("boardId", boardId)],
      ),
      databases.listDocuments<Task>(DATABASE_ID, TASKS_ID, [
        Query.equal("boardId", boardId),
      ]),
    ]);

    const statusColumn = statusColumnData.documents[0];
    const tasks = tasksData.documents;

    if (tasks.length === 0) {
      const fallbackBoardId = statusColumn.boardId;

      return c.json({
        statusColumn: {
          boardId: fallbackBoardId,
          columns: [],
        },
        tasks: [],
      });
    }

    const subtasksIds = tasks.map((task) => task.subtasksId);

    const subtasksPromises = subtasksIds.map((id) =>
      databases.getDocument<SubtasksDocument>(DATABASE_ID, SUB_TASKS_ID, id),
    );

    const subtasksDocuments = await Promise.all(subtasksPromises);

    const subtasksMap = new Map<string, SubtasksDocument>();

    for (const document of subtasksDocuments) {
      subtasksMap.set(document.$id, document);
    }

    const columns: StatusColumnItem[] = [];

    let finalBoardId = boardId;

    if (statusColumn) {
      finalBoardId = statusColumn.boardId;

      for (let i = 0; i < MAX_COLUMNS; i++) {
        const getStatusName = statusColumn[`column_${i}`];
        const getStatusId = statusColumn[`column_${i}_id`];

        if (getStatusName && getStatusId) {
          columns.push({
            statusName: getStatusName,
            statusId: getStatusId,
          });
        }
      }
    }

    const updatedTasks = tasks.map((task) => {
      const subtasksDocument = subtasksMap.get(task.subtasksId);

      const taskSubtasks: { subtaskName: string; isCompleted: boolean }[] = [];

      if (subtasksDocument) {
        for (let i = 0; i < MAX_SUB_TASKS; i++) {
          const getSubtaskName = subtasksDocument[`subtask_${i}`];
          const getIsCompleted = subtasksDocument[`subtask_check_${i}`];

          if (getSubtaskName) {
            taskSubtasks.push({
              subtaskName: getSubtaskName,
              isCompleted: getIsCompleted,
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
  })
  .patch(
    "/update-task",
    sessionMiddleware,
    zValidator("json", updateTaskSchema),
    async (c) => {
      const databases = c.get("databases");
      const {
        taskId,
        subtasksId,
        boardId,
        taskName,
        statusId,
        priority,
        description,
        subtasks,
      } = c.req.valid("json");

      const subtaskData: Record<string, unknown> = { boardId };

      subtasks.forEach((subtask, i) => {
        subtaskData[`subtask_${i}`] = subtask.subtaskName;
        subtaskData[`subtask_check_${i}`] = subtask.isCompleted || false;
      });

      for (let i = subtasks.length; i < MAX_SUB_TASKS; i++) {
        subtaskData[`subtask_${i}`] = null;
        subtaskData[`subtask_check_${i}`] = null;
      }

      const subtasksPromise = databases.updateDocument(
        DATABASE_ID,
        SUB_TASKS_ID,
        subtasksId,
        subtaskData,
      );

      const taskUpdateData = {
        boardId,
        taskName,
        statusId,
        priority,
        description,
      };

      const taskPromise = databases.updateDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId,
        taskUpdateData,
      );

      const [updatedTask, subtasksDocument] = await Promise.all([
        taskPromise,
        subtasksPromise,
      ]);

      return c.json({ task: updatedTask, subtasks: subtasksDocument });
    },
  )
  .patch(
    "/update-subtasks",
    sessionMiddleware,
    zValidator("json", updateSubtasksSchema),
    async (c) => {
      const databases = c.get("databases");

      const { boardId, taskId, statusId, subtasksId, subtasks } =
        c.req.valid("json");

      const subtaskData: Record<string, unknown> = { boardId };

      subtasks.forEach((subtask, i) => {
        subtaskData[`subtask_${i}`] = subtask.subtaskName;
        subtaskData[`subtask_check_${i}`] = subtask.isCompleted;
      });

      for (let i = subtasks.length; i < MAX_SUB_TASKS; i++) {
        subtaskData[`subtask_${i}`] = null;
        subtaskData[`subtask_check_${i}`] = null;
      }

      const taskPromise = databases.updateDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId,
        {
          statusId,
        },
      );

      const subtasksPromise = databases.updateDocument(
        DATABASE_ID,
        SUB_TASKS_ID,
        subtasksId,
        subtaskData,
      );

      const [updatedTask, updatedSubtasks] = await Promise.all([
        taskPromise,
        subtasksPromise,
      ]);

      return c.json({ task: updatedTask, subtasks: updatedSubtasks });
    },
  );

export default app;
