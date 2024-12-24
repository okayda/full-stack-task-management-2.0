"use client";

import { useState } from "react";

import { useGetBoardId } from "../hooks/use-get-board-id";

import { useUpdateTaskContent } from "../api/use-update-task-content";
import { useDeleteTask } from "../api/use-delete-task";

import { customizeUpperCase, cn } from "@/lib/utils";

import { TaskContentActions } from "./task-content-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StatusColumn, Task, SubTask } from "../types";

import { MoreVertical } from "lucide-react";

interface TaskContentProps {
  task: Task;
  statusColumn: StatusColumn;

  closeTaskContentModal: () => void;
}

export default function TaskContent({
  task,
  statusColumn,
  closeTaskContentModal,
}: TaskContentProps) {
  const [subTasks, setSubTasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.statusId);

  const [originalSubTasks] = useState(task.subtasks);
  const [originalStatus] = useState(task.statusId);

  const boardId = useGetBoardId();

  const { mutate: updateTaskContent, isPending: isUpdatingTaskContent } =
    useUpdateTaskContent();

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const checkboxHandler = function (subTaskIndex: number) {
    setSubTasks((prev: SubTask[]) =>
      prev.map((subTask: SubTask, stateIndex: number) => {
        if (stateIndex === subTaskIndex) {
          return { ...subTask, isCompleted: !subTask.isCompleted };
        } else {
          return subTask;
        }
      }),
    );
  };

  const onSubmit = function () {
    updateTaskContent({
      json: {
        boardId,
        taskId: task.$id,
        statusId: status,
        subtasksId: task.subtasksId,
        subtasks: subTasks,
      },
    });

    closeTaskContentModal();
  };

  const deleteTaskHandler = function () {
    deleteTask({
      json: {
        boardId,
        taskId: task.$id,
      },
    });

    closeTaskContentModal();
  };

  // Validating if there is any changes to the previous task data otherwise it will determine if the button is clickable
  const subTasksChanged =
    JSON.stringify(originalSubTasks) !== JSON.stringify(subTasks);
  const statusChanged =
    JSON.stringify(originalStatus) !== JSON.stringify(status);
  const isSaveDisabled = !subTasksChanged && !statusChanged;

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 px-4 pb-5 sm:px-6">
        <CardTitle className="text-lg font-medium text-foreground">
          {task.taskName}
        </CardTitle>

        <TaskContentActions
          task={task}
          statusColumn={statusColumn}
          closeTaskContentModal={closeTaskContentModal}
          deleteTaskHandler={deleteTaskHandler}
        >
          <MoreVertical className="!size-6" />
        </TaskContentActions>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <div className="px-4 sm:px-6">
          <p
            className={cn(
              "mb-5 font-geist text-[0.9375rem] text-muted-foreground",
              {
                "rounded-md bg-[#FAFAFA] p-3 text-[0.8125rem] text-foreground shadow-inner":
                  !task.description,
              },
            )}
          >
            {task.description ? task.description : "No Description"}
          </p>

          <div className="mb-5">
            <h4 className="mb-1.5 text-[0.90625rem] font-medium text-foreground">
              Subtasks
            </h4>

            <ul className="flex flex-col gap-y-2">
              {subTasks.length > 0 ? (
                subTasks.map((subtask: Task, index: number) => (
                  <li
                    key={`task-${index}`}
                    className="text-[0.8125rem] tracking-wide text-primary"
                  >
                    <label
                      htmlFor={`task-${index}`}
                      className="flex cursor-pointer items-center gap-x-2 rounded-md bg-[#FAFAFA] px-3 py-3.5 shadow-inner"
                    >
                      <input
                        id={`task-${index}`}
                        type="checkbox"
                        checked={subtask.isCompleted}
                        onChange={() => checkboxHandler(index)}
                        className="cursor-pointer accent-[#0F0F0F] focus:outline-none focus:ring-0"
                      />

                      <span className="leading-none">
                        {subtask.subtaskName}
                      </span>
                    </label>
                  </li>
                ))
              ) : (
                <li className="rounded-md bg-[#FAFAFA] p-3 font-geist text-[0.8125rem] shadow-inner">
                  No Subtask
                </li>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="mb-1.5 text-[0.90625rem] font-medium">
              Current status
            </h4>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]">
                <SelectValue placeholder={status} />
              </SelectTrigger>

              <SelectContent>
                {statusColumn.columns.map((column) => {
                  const columnName = customizeUpperCase(column.statusName);

                  return (
                    <SelectItem key={column.statusId} value={column.statusId}>
                      {columnName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t bg-[#FAFAFA] px-4 py-4 sm:px-6">
          <div className="flex gap-x-2">
            <Button
              onClick={onSubmit}
              disabled={
                isUpdatingTaskContent || isSaveDisabled || isDeletingTask
              }
              className="h-[2.625rem] w-full tracking-wide"
            >
              {isUpdatingTaskContent
                ? "Loading..."
                : isDeletingTask
                  ? "Deleting..."
                  : "Save"}
            </Button>

            <Button
              onClick={closeTaskContentModal}
              disabled={isUpdatingTaskContent || isDeletingTask}
              variant="outline"
              className="h-[2.625rem] w-full border-neutral-300/80 tracking-wide"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
