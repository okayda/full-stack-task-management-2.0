"use client";

import { useState } from "react";

import { customizeUpperCase } from "@/lib/utils";

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

interface TaskContentProps {
  onCancel?: () => void;
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
}

export default function TaskContent({
  onCancel,
  task,
  statusColumn,
}: TaskContentProps) {
  const [subTasks, setSubTasks] = useState(task.subtasks);

  const currentStatus = statusColumn.columns.find(
    (status) => status.statusId === task.columnId,
  );

  const [status, setStatus] = useState(
    customizeUpperCase(currentStatus?.statusName || "TODO"),
  );

  const checkboxHandler = function (i: number) {
    const updatedSubTasks = [...subTasks];

    updatedSubTasks[i] = {
      ...updatedSubTasks[i],
      isCompleted: !updatedSubTasks[i].isCompleted,
    };

    setSubTasks(updatedSubTasks);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 pb-5 sm:pt-10">
        <CardTitle className="text-lg font-semibold">{task.taskName}</CardTitle>

        <TaskContentActions>
          <MoreVertical className="!size-5" />
        </TaskContentActions>
      </CardHeader>

      <CardContent>
        <p className="mb-5 text-sm text-muted-foreground">{task.description}</p>

        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-foreground">Subtasks</h4>

          <ul className="flex flex-col gap-y-1.5">
            {subTasks.length > 0 ? (
              subTasks.map((task: Task, index: number) => (
                <li key={task.id} className="text-[13px]">
                  <label
                    htmlFor={`task-${index}`}
                    className="flex cursor-pointer items-center gap-x-3 rounded-md bg-neutral-100 p-3 transition-colors hover:bg-neutral-200/70"
                  >
                    <input
                      id={`task-${index}`}
                      type="checkbox"
                      checked={task.isComplete}
                      onChange={() => checkboxHandler(index)}
                      className="h-[14.5px] w-[14.5px] accent-[#0F0F0F] focus:outline-none focus:ring-0"
                    />
                    {task.title}
                  </label>
                </li>
              ))
            ) : (
              <li className="rounded-md bg-neutral-100 p-3 text-center text-[13px]">
                Empty
              </li>
            )}
          </ul>
        </div>

        <div className="mb-7">
          <h4 className="mb-1 text-sm font-medium text-foreground">
            Current status
          </h4>

          <Select onValueChange={setStatus}>
            <SelectTrigger className="h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
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
          <Button onClick={onCancel} className="h-[42px] w-full tracking-wide">
            Save
          </Button>

          <Button
            onClick={onCancel}
            variant="secondary"
            className="h-[42px] w-full border tracking-wide"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
