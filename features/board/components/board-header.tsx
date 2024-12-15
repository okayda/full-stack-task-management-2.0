"use client";

import { customizeUpperCase } from "@/lib/utils";

import { CirclePlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface BoardHeaderProps {
  statusName: string;
  taskCount: number;
}

export default function BoardHeader({
  statusName,
  taskCount,
}: BoardHeaderProps) {
  const { open: openTaskFormModal } = useCreateTaskModal();

  return (
    <div className="mb-6 flex cursor-auto items-center justify-between rounded-md border-b border-neutral-300 px-2 pb-3 2xl:mr-[0.625rem]">
      <div className="flex items-center gap-x-2">
        <div>
          <h2 className="inline-block text-sm font-medium">
            {customizeUpperCase(statusName)}
          </h2>
        </div>

        <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-100 text-xs font-medium">
          {taskCount}
        </div>
      </div>

      <div className="size-[1.125rem] cursor-pointer">
        <CirclePlusIcon className="size-full" onClick={openTaskFormModal} />
      </div>
    </div>
  );
}
