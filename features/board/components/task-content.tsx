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

import { StatusColumn } from "../types";

import { MoreVertical } from "lucide-react";

const exampleSubtasks = [
  { id: "internal", title: "Internal testing", isComplete: false },
  { id: "external", title: "External testing", isComplete: false },
];

interface TaskContentProps {
  onCancel?: () => void;
  statusColumn: StatusColumn[];
}

export default function TaskContent({
  onCancel,
  statusColumn,
}: TaskContentProps) {
  const [status, setStatus] = useState("TODO");
  const [subTasks, setSubTasks] = useState(exampleSubtasks);

  const checkboxHandler = function (i: number) {
    const copySubTasks = [...subTasks];
    copySubTasks[i] = { ...copySubTasks[i] };
    copySubTasks[i].isComplete = !copySubTasks[i].isComplete;
    setSubTasks(copySubTasks);
  };

  console.log(subTasks);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 pb-5 sm:pt-10">
        <CardTitle className="text-lg font-semibold">
          QA and test all major user Journeys.
        </CardTitle>

        <TaskContentActions>
          <MoreVertical className="!size-5" />
        </TaskContentActions>
      </CardHeader>

      <CardContent>
        <p className="mb-5 text-sm text-muted-foreground">
          Once we feel version one is ready, we need to rigorously test it both
          internally and externally to identify any major gaps.
        </p>

        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-foreground">Subtasks</h4>

          <ul className="flex flex-col gap-y-1.5">
            {subTasks.map((task, index) => (
              <li key={task.id} className="text-[13px]">
                <label
                  htmlFor={`task-${task.id}`}
                  className="flex items-center gap-x-3 rounded-md bg-muted p-3"
                >
                  <input
                    id={`task-${task.id}`}
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => checkboxHandler(index)}
                    className="h-[14.5px] w-[14.5px] accent-[#0F0F0F]"
                  />
                  {task.title}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-7">
          <h4 className="mb-1 text-sm font-medium text-foreground">
            Current status
          </h4>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              {statusColumn.map((statusColumn) => {
                const columnName = customizeUpperCase(statusColumn.statusName);

                return (
                  <SelectItem
                    key={statusColumn.statusId}
                    value={statusColumn.statusId}
                  >
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
