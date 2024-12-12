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
  onCancel?: () => void;
}

export const TaskContentActions = function ({
  task,
  statusColumn,
  children,
  onCancel,
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
      />

      <div className="flex cursor-pointer justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="cursor-pointer p-[10px] font-medium"
              onClick={() => {
                openEditModal();
              }}
            >
              <FilePenLineIcon />

              <span className="text-[13px]">Edit your task</span>
            </DropdownMenuItem>

            <div className="py-1">
              <Separator />
            </div>

            <DropdownMenuItem
              className="cursor-pointer p-[10px] font-medium text-rose-700 focus:text-rose-700"
              onClick={onCancel}
            >
              <CalendarOffIcon />

              <span className="text-[13px]">Finish | Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </React.Fragment>
  );
};
