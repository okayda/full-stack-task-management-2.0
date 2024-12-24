import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { Databases, ID, Query } from "node-appwrite";

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
  createColumnSchema,
  deleteTaskSchema,
  taskSchema,
  updateTaskSchema,
  updateSubtasksSchema,
  settingColumnSchema,
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
      const user = c.get("user");
      const databases = c.get("databases") as Databases;

      const { boardName } = c.req.valid("json");

      const boardId = ID.unique();

      const defaultStatusColumn = {
        boardId,
        column_0: "todo",
        column_0_id: "status100",
        column_1: "done",
        column_1_id: "status200",
      };

      const [board, statusColumn] = await Promise.all([
        databases.createDocument(DATABASE_ID, BOARDS_ID, boardId, {
          boardName,
          userId: user.$id,
        }),
        databases.createDocument(
          DATABASE_ID,
          STATUS_COLUMN_ID,
          ID.unique(),
          defaultStatusColumn,
        ),
      ]);

      return c.json({
        board,
        statusColumn,
      });
    },
  )
  .post(
    "/create-column",
    sessionMiddleware,
    zValidator("json", createColumnSchema),
    async (c) => {
      const databases = c.get("databases") as Databases;
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
        return c.json({ error: "No more available columns to add" }, 400);
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
      const databases = c.get("databases") as Databases;

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
  .post(
    "/update-setting-column",
    sessionMiddleware,
    zValidator("json", settingColumnSchema),
    async (c) => {
      const databases = c.get("databases") as Databases;
      const { boardId, boardName, statusColumn } = c.req.valid("json");

      const statusDocumentPromise = databases.listDocuments(
        DATABASE_ID,
        STATUS_COLUMN_ID,
        [Query.equal("boardId", boardId), Query.limit(1)],
      );

      const [statusDocumentList] = await Promise.all([statusDocumentPromise]);
      const statusDocument = statusDocumentList.documents[0];

      const oldColumnsAvailable = [
        {
          statusId: statusDocument.column_0_id,
          statusName: statusDocument.column_0,
        },
        {
          statusId: statusDocument.column_1_id,
          statusName: statusDocument.column_1,
        },
        {
          statusId: statusDocument.column_2_id,
          statusName: statusDocument.column_2,
        },
        {
          statusId: statusDocument.column_3_id,
          statusName: statusDocument.column_3,
        },
        {
          statusId: statusDocument.column_4_id,
          statusName: statusDocument.column_4,
        },
      ].filter((column) => column.statusId && column.statusName);

      const currentColumnsAvailable = statusColumn
        .filter((col) => col.statusId)
        .map((col) => col.statusId);

      const removedColumns = oldColumnsAvailable.filter(
        (oldColumn) => !currentColumnsAvailable.includes(oldColumn.statusId),
      );

      const deletePromises = removedColumns.map(async (column) => {
        if (!column.statusId) return;

        const tasks = await databases.listDocuments(DATABASE_ID, TASKS_ID, [
          Query.equal("boardId", boardId),
          Query.equal("statusId", column.statusId),
        ]);

        const taskDeletionPromises = tasks.documents.map((task) =>
          Promise.all([
            databases.deleteDocument(DATABASE_ID, TASKS_ID, task.$id),
            databases.deleteDocument(
              DATABASE_ID,
              SUB_TASKS_ID,
              task.subtasksId,
            ),
          ]),
        );

        return Promise.all(taskDeletionPromises);
      });

      await Promise.all(deletePromises);

      const usedIds = statusColumn
        .filter((col) => !!col.statusId)
        .map((col) => col.statusId);

      const availableIds = VALID_STATUS_ID.filter(
        (id) => !usedIds.includes(id),
      );

      statusColumn.forEach((column) => {
        if (!column.statusId) {
          column.statusId = availableIds.shift() ?? "";
        }
      });

      await Promise.all([
        databases.updateDocument(DATABASE_ID, BOARDS_ID, boardId, {
          boardName,
        }),
        databases.updateDocument(
          DATABASE_ID,
          STATUS_COLUMN_ID,
          statusDocument.$id,
          {
            boardId,
            ...statusColumn.reduce(
              (accumalator, column, i) => ({
                ...accumalator,
                [`column_${i}`]: column.statusName.trim(),
                [`column_${i}_id`]: column.statusId.trim(),
              }),
              {},
            ),
            ...Array.from(
              { length: MAX_COLUMNS - statusColumn.length },
              (_, i) => ({
                [`column_${statusColumn.length + i}`]: null,
                [`column_${statusColumn.length + i}_id`]: null,
              }),
            ).reduce(
              (accumalator, column) => ({ ...accumalator, ...column }),
              {},
            ),
          },
        ),
      ]);

      return c.json({ success: true });
    },
  )
  .post("/create-example-board-data", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases") as Databases;

    const data = await initializeBoardDataExample(databases, user.$id);

    return c.json({ data });
  })
  .get("/get-board-names", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases") as Databases;

    const boards = await databases.listDocuments(DATABASE_ID, BOARDS_ID, [
      Query.equal("userId", user.$id),
    ]);

    return c.json({ boards: boards.documents });
  })
  .get("/get-board-data", sessionMiddleware, async (c) => {
    const databases = c.get("databases") as Databases;
    const boardId = c.req.query("boardId");

    if (!boardId) {
      return c.json(
        {
          error: "Failed to get board data since the boardId is not provided",
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
      const columns: StatusColumnItem[] = [];

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

      return c.json({
        statusColumn: {
          boardId,
          columns,
        },
        tasks: [],
      });
    }

    const subtasksIds = tasks.map((task) => task.subtasksId);

    const subtasksData = await databases.listDocuments<SubtasksDocument>(
      DATABASE_ID,
      SUB_TASKS_ID,
      [Query.equal("$id", subtasksIds)],
    );

    const subtasksDocuments = subtasksData.documents;

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
    "/update-task-content",
    sessionMiddleware,
    zValidator("json", updateSubtasksSchema),
    async (c) => {
      const databases = c.get("databases") as Databases;

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
  )
  .patch(
    "/update-edit-task",
    sessionMiddleware,
    zValidator("json", updateTaskSchema),
    async (c) => {
      const databases = c.get("databases") as Databases;
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
  .delete(
    "/delete-task",
    sessionMiddleware,
    zValidator("json", deleteTaskSchema),
    async (c) => {
      const databases = c.get("databases") as Databases;
      const { taskId, boardId } = c.req.valid("json");

      const taskDocuments = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("$id", taskId),
          Query.equal("boardId", boardId),
          Query.limit(1),
        ],
      );

      const task = taskDocuments.documents[0];

      const deleteTaskPromise = databases.deleteDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId,
      );

      const deleteSubtasksPromise = databases.deleteDocument(
        DATABASE_ID,
        SUB_TASKS_ID,
        task.subtasksId,
      );

      await Promise.all([deleteTaskPromise, deleteSubtasksPromise]);

      return c.json({
        message: "Task & Subtasks deleted successfully",
      });
    },
  );

export default app;
