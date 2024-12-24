import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { StatusColumn, Task } from "../types";

import { FilePenLineIcon, CalendarOffIcon } from "lucide-react";
import { EditTaskModal } from "./edit-task-modal";

interface TaskContentActionsProps {
  task: Task;
  statusColumn: StatusColumn;
  children: React.ReactNode;

  closeTaskContentModal: () => void;
  deleteTaskHandler: () => void;
}

export const TaskContentActions = function ({
  task,
  statusColumn,
  children,
  closeTaskContentModal,
  deleteTaskHandler,
}: TaskContentActionsProps) {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const openEditTaskModal = () => setIsEditTaskModalOpen(true);
  const closeEditTaskModal = () => setIsEditTaskModalOpen(false);

  return (
    <React.Fragment>
      <EditTaskModal
        task={task}
        statusColumn={statusColumn}
        closeTaskContentModal={closeTaskContentModal}
        isEditTaskModalOpen={isEditTaskModalOpen}
        closeEditTaskModal={closeEditTaskModal}
      />

      <div className="flex cursor-pointer justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="cursor-pointer p-[0.625rem] font-medium"
              onClick={() => {
                openEditTaskModal();
              }}
            >
              <FilePenLineIcon />

              <span className="self-end text-[0.8125rem] leading-[1.1]">
                Edit your task
              </span>
            </DropdownMenuItem>

            <div className="py-1">
              <Separator />
            </div>

            <DropdownMenuItem
              className="cursor-pointer p-[0.625rem] font-medium text-rose-700 focus:text-rose-700"
              onClick={deleteTaskHandler}
            >
              <CalendarOffIcon />

              <span className="self-end text-[0.8125rem] leading-[1.1]">
                Finish | Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </React.Fragment>
  );
};
