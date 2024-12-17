"use client";

import { customizeUpperCase } from "@/lib/utils";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { CirclePlusIcon, CircleDashedIcon } from "lucide-react";

import { VALID_STATUS_ID } from "../constants";

interface BoardHeaderProps {
  statusId: string;
  statusName: string;
  taskCount: number;
}

const colors = ["#F9A8D4", "#38BDF8", "#34D399", "#C084FC", "#C36E6E"];

export default function BoardHeader({
  statusId,
  statusName,
  taskCount,
}: BoardHeaderProps) {
  const { open: openTaskFormModal } = useCreateTaskModal();

  const statusIndex = VALID_STATUS_ID.indexOf(statusId);

  const color = statusIndex >= 0 ? colors[statusIndex] : colors[0];

  return (
    <div className="mb-6 flex cursor-auto items-center justify-between rounded-md border-b border-neutral-300 px-2 pb-3">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: color }}
          />

          <div>
            <h2 className="font-roboto inline-block text-sm font-medium leading-none tracking-wide">
              {customizeUpperCase(statusName)}
            </h2>
          </div>
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
