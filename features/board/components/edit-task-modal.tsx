"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

import { Task, StatusColumnItem } from "../types";

interface EditTaskModalProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };

  isEditModalOpen: boolean;
  closeEditModal: () => void;
}

export function EditTaskModal({
  task,
  statusColumn,
  isEditModalOpen,
  closeEditModal,
}: EditTaskModalProps) {
  return (
    <ResponsiveModal open={isEditModalOpen} onOpenChange={closeEditModal}>
      <EditTaskFormWrapper
        task={task}
        statusColumn={statusColumn}
        closeEditModal={closeEditModal}
      />
    </ResponsiveModal>
  );
}
