import { customizeUpperCase } from "@/lib/utils";

import { TaskStatus } from "../types";

import { CirclePlusIcon } from "lucide-react";

interface BoardHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

export default function BoardHeader({ board, taskCount }: BoardHeaderProps) {
  return (
    <div className="mb-6 flex cursor-auto items-center justify-between rounded-md border-b border-neutral-300 px-2 pb-3 2xl:mr-[10px]">
      <div className="flex items-center gap-x-2">
        <div>
          <h2 className="inline-block text-sm font-medium">
            {customizeUpperCase(board)}
          </h2>
        </div>

        <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium">
          {taskCount}
        </div>
      </div>

      <div className="size-[18px] cursor-pointer">
        <CirclePlusIcon className="size-full" />
      </div>
    </div>
  );
}
