import React, { useState } from "react";

import { TaskContentModal } from "./task-content-modal";

import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { LiaGripHorizontalSolid } from "react-icons/lia";

import { StatusColumn, Task, SubTask } from "../types";

interface BoardTaskCardProps {
  task: Task;
  statusColumn: StatusColumn;
}

const priorityIcons: Record<string, { icon: JSX.Element; tooltip: string }> = {
  LOWEST: {
    icon: (
      <MdOutlineKeyboardDoubleArrowDown
        className="size-6 text-blue-500"
        aria-label="Lowest priority"
      />
    ),
    tooltip: "Lowest Priority",
  },
  LOW: {
    icon: (
      <MdOutlineKeyboardArrowDown
        className="size-6 text-blue-500"
        aria-label="Low priority"
      />
    ),
    tooltip: "Low Priority",
  },
  MEDIUM: {
    icon: (
      <LiaGripHorizontalSolid
        className="size-5 text-amber-400"
        aria-label="Medium priority"
      />
    ),
    tooltip: "Medium Priority",
  },
  HIGH: {
    icon: (
      <MdOutlineKeyboardArrowUp
        className="size-6 text-rose-500"
        aria-label="High priority"
      />
    ),
    tooltip: "High Priority",
  },
  HIGHEST: {
    icon: (
      <MdOutlineKeyboardDoubleArrowUp
        className="size-6 text-rose-500"
        aria-label="Highest priority"
      />
    ),
    tooltip: "Highest Priority",
  },
};

const getPriorityType = function (priorityStr: string) {
  const priority = priorityIcons[priorityStr];
  if (!priority) return null;

  return (
    <div className="group relative flex">
      {priority.icon}
      <span className="absolute -bottom-1 right-6 mb-1 hidden whitespace-nowrap rounded bg-[#0F0F0F] px-2 py-1 text-xs text-white shadow-md group-hover:block">
        {priority.tooltip}
      </span>
    </div>
  );
};

const priorityBorderColors: Record<string, string> = {
  LOWEST: "border-l-blue-500",
  LOW: "border-l-blue-500",
  MEDIUM: "border-l-amber-400",
  HIGH: "border-l-rose-500",
  HIGHEST: "border-l-rose-500",
};

export default function BoardTaskCard({
  task,
  statusColumn,
}: BoardTaskCardProps) {
  const [isTaskContentModalOpen, setIsTaskContentModalOpen] = useState(false);
  const openTaskContentModal = () => setIsTaskContentModalOpen(true);
  const closeTaskContentModal = () => setIsTaskContentModalOpen(false);

  const defaultClass =
    "relative cursor-pointer rounded-lg border border-l-4 border-y-transparent border-r-transparent bg-white px-4 2xl:pr-6 py-6 shadow-task transition";

  const borderColor = priorityBorderColors[task.priority];

  const completedSubtasks = task.subtasks.filter(
    (subtask: SubTask) => subtask.isCompleted,
  ).length;
  const totalSubtasks = task.subtasks.length;

  if (!task) {
    return <div>TANG INA MO!!</div>;
  }

  return (
    <React.Fragment>
      <TaskContentModal
        task={task}
        statusColumn={statusColumn}
        isTaskContentModalOpen={isTaskContentModalOpen}
        closeTaskContentModal={closeTaskContentModal}
      />

      <div
        className={`${defaultClass} ${borderColor}`}
        onClick={openTaskContentModal}
      >
        <div className="absolute right-2 top-2">
          {getPriorityType(task.priority)}
        </div>

        <h3 className="mb-2 pb-2.5 text-[0.90625rem] font-medium">
          {task.taskName}
        </h3>

        <p className="text-xs font-medium text-muted-foreground/65">
          {completedSubtasks} of {totalSubtasks} subtasks
        </p>
      </div>
    </React.Fragment>
  );
}
