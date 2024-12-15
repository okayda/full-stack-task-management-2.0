"use client";

import { useState } from "react";

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

import { Task, StatusColumnItem } from "../types";

import { MoreVertical } from "lucide-react";

type SubTask = {
  title: string;
  isCompleted: boolean;
};

interface TaskContentProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
  closeTaskModal: () => void;
}

export default function TaskContent({
  task,
  statusColumn,
  closeTaskModal,
}: TaskContentProps) {
  const [subTasks, setSubTasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.statusId);

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

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 pb-5 sm:pt-10">
        <CardTitle className="text-lg font-semibold">{task.taskName}</CardTitle>

        <TaskContentActions
          task={task}
          statusColumn={statusColumn}
          closeTaskModal={closeTaskModal}
        >
          <MoreVertical className="!size-5" />
        </TaskContentActions>
      </CardHeader>

      <CardContent>
        <p
          className={cn("mb-5 text-sm text-muted-foreground", {
            "rounded-md bg-neutral-100 p-3 text-center text-[0.8125rem] text-foreground":
              !task.description,
          })}
        >
          {task.description ? task.description : "No Description"}
        </p>

        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-foreground">Subtasks</h4>

          <ul className="flex flex-col gap-y-1.5">
            {subTasks.length > 0 ? (
              subTasks.map((subtask: Task, index: number) => (
                <li key={`task-${index}`} className="text-[0.8125rem]">
                  <label
                    htmlFor={`task-${index}`}
                    className="flex cursor-pointer items-center gap-x-3 rounded-md bg-neutral-100 p-3 transition-colors hover:bg-neutral-200/70"
                  >
                    <input
                      id={`task-${index}`}
                      type="checkbox"
                      checked={subtask.isCompleted}
                      onChange={() => checkboxHandler(index)}
                      className="size-[0.90625rem] accent-[#0F0F0F] focus:outline-none focus:ring-0"
                    />
                    {subtask.subtaskName}
                  </label>
                </li>
              ))
            ) : (
              <li className="rounded-md bg-neutral-100 p-3 text-center text-[0.8125rem]">
                Empty
              </li>
            )}
          </ul>
        </div>

        <div className="mb-7">
          <h4 className="mb-1 text-sm font-medium text-foreground">
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

        <div className="flex gap-x-2">
          <Button
            onClick={closeTaskModal}
            className="h-[2.625rem] w-full tracking-wide"
          >
            Save
          </Button>

          <Button
            onClick={closeTaskModal}
            variant="secondary"
            className="h-[2.625rem] w-full border tracking-wide"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
