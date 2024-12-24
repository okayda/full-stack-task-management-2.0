"use client";

import React, { useState } from "react";

import { customizeUpperCase } from "@/lib/utils";

import { CirclePlusIcon } from "lucide-react";

import { VALID_STATUS_ID } from "../constants";
import { StatusColumn } from "../types";
import { CreateTaskModal } from "./create-task-modal";

interface BoardHeaderProps {
  statusColumn: StatusColumn;
  statusId: string;
  statusName: string;
  taskCount: number;
}

const colors = ["#F9A8D4", "#38BDF8", "#34D399", "#C084FC", "#C36E6E"];

export default function BoardHeader({
  statusColumn,
  statusId,
  statusName,
  taskCount,
}: BoardHeaderProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const openCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setIsCreateTaskModalOpen(false);

  const statusIndex = VALID_STATUS_ID.indexOf(statusId);

  const color = statusIndex >= 0 ? colors[statusIndex] : colors[0];

  return (
    <React.Fragment>
      <CreateTaskModal
        statusColumn={statusColumn}
        isCreateTaskModalOpen={isCreateTaskModalOpen}
        closeCreateTaskModal={closeCreateTaskModal}
      />

      <div className="mb-6 flex cursor-auto items-center justify-between rounded-md border-b border-neutral-300 px-2 pb-3">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: color }}
            />

            <div>
              <h2 className="inline-block font-roboto text-sm font-medium leading-none tracking-wide">
                {customizeUpperCase(statusName)}
              </h2>
            </div>
          </div>

          <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-100 text-xs font-medium">
            {taskCount}
          </div>
        </div>

        <div className="size-[1.125rem] cursor-pointer">
          <CirclePlusIcon className="size-full" onClick={openCreateTaskModal} />
        </div>
      </div>
    </React.Fragment>
  );
}
