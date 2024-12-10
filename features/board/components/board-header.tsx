"use client";

import { customizeUpperCase } from "@/lib/utils";

import { CirclePlusIcon } from "lucide-react";
// import { useCreateTaskModal } from "../hooks/use-create-task-modal";
// import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { useTaskContentModal } from "../hooks/use-task-content-modal";

interface BoardHeaderProps {
  statusName: string;
  taskCount: number;
}

export default function BoardHeader({
  statusName,
  taskCount,
}: BoardHeaderProps) {
  // const { open: openTaskFormModal } = useCreateTaskModal();
  // const { open: openEditTaskFormModal } = useEditTaskModal();

  const { open: openTaskContentModal } = useTaskContentModal();

  return (
    <div className="mb-6 flex cursor-auto items-center justify-between rounded-md border-b border-neutral-300 px-2 pb-3 2xl:mr-[10px]">
      <div className="flex items-center gap-x-2">
        <div>
          <h2 className="inline-block text-sm font-medium">
            {customizeUpperCase(statusName)}
          </h2>
        </div>

        <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium">
          {taskCount}
        </div>
      </div>

      <div className="size-[18px] cursor-pointer">
        {/* <CirclePlusIcon className="size-full" onClick={openTaskFormModal} /> */}

        {/* <CirclePlusIcon className="size-full" onClick={openEditTaskFormModal} /> */}

        <CirclePlusIcon className="size-full" onClick={openTaskContentModal} />
      </div>
    </div>
  );
}
