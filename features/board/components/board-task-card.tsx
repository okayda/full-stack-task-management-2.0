import { FaGripLines } from "react-icons/fa6";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { Task } from "../types";

interface BoardTaskProps {
  task: Task;
}

const priorityIcons: Record<string, { icon: JSX.Element; tooltip: string }> = {
  Lowest: {
    icon: (
      <MdOutlineKeyboardDoubleArrowDown
        className="size-6 text-blue-500"
        aria-label="Lowest priority"
      />
    ),
    tooltip: "Lowest Priority",
  },
  Low: {
    icon: (
      <MdOutlineKeyboardArrowDown
        className="size-6 text-blue-500"
        aria-label="Low priority"
      />
    ),
    tooltip: "Low Priority",
  },
  Medium: {
    icon: (
      <FaGripLines
        className="size-[18px] text-amber-400"
        aria-label="Medium priority"
      />
    ),
    tooltip: "Medium Priority",
  },
  High: {
    icon: (
      <MdOutlineKeyboardArrowUp
        className="size-6 text-rose-500"
        aria-label="High priority"
      />
    ),
    tooltip: "High Priority",
  },
  Highest: {
    icon: (
      <MdOutlineKeyboardDoubleArrowUp
        className="size-6 text-rose-500"
        aria-label="Highest priority"
      />
    ),
    tooltip: "Highest Priority",
  },
};

const getPriorityType = (priorityStr: string): JSX.Element | null => {
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
  Lowest: "border-l-blue-500",
  Low: "border-l-blue-500",
  Medium: "border-l-amber-400",
  High: "border-l-rose-500",
  Highest: "border-l-rose-500",
};

export default function BoardTaskCard({ task }: BoardTaskProps) {
  const defaultClass =
    "relative cursor-pointer rounded-lg border border-l-4 border-y-transparent border-r-transparent bg-white px-4 py-6 shadow-task transition";

  const borderColor = priorityBorderColors[task.priority];

  return (
    <div className={`${defaultClass} ${borderColor}`}>
      <div className="absolute right-2 top-2">
        {getPriorityType(task.priority)}
      </div>
      <h3 className="mb-2 pb-2.5 text-[14px] font-medium">{task.name}</h3>
      <p className="text-xs font-medium text-muted-foreground">
        0 of 5 subtasks
      </p>
    </div>
  );
}
