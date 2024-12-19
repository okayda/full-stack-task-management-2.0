import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { StatusColumnItem, Task } from "../types";

import { FilePenLineIcon, CalendarOffIcon } from "lucide-react";
import { EditTaskModal } from "./edit-task-modal";

interface TaskContentActionsProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };

  children: React.ReactNode;

  closeTaskModal: () => void;
  deleteTaskHander: () => void;
}

export const TaskContentActions = function ({
  task,
  statusColumn,
  children,
  closeTaskModal,
  deleteTaskHander,
}: TaskContentActionsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <React.Fragment>
      <EditTaskModal
        task={task}
        statusColumn={statusColumn}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        closeTaskModal={closeTaskModal}
      />

      <div className="flex cursor-pointer justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="cursor-pointer p-[0.625rem] font-medium"
              onClick={() => {
                openEditModal();
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
              onClick={deleteTaskHander}
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
