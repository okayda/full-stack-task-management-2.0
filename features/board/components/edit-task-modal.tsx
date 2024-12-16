"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { EditTaskForm } from "./edit-task-form";

import { Task, StatusColumnItem } from "../types";

interface EditTaskModalProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };

  isEditModalOpen: boolean;
  closeEditModal: () => void;
  closeTaskModal: () => void;
}

export function EditTaskModal({
  task,
  statusColumn,
  isEditModalOpen,
  closeEditModal,
  closeTaskModal,
}: EditTaskModalProps) {
  return (
    <ResponsiveModal open={isEditModalOpen} onOpenChange={closeEditModal}>
      <EditTaskForm
        task={task}
        statusColumn={statusColumn}
        closeEditModal={closeEditModal}
        closeTaskModal={closeTaskModal}
      />
    </ResponsiveModal>
  );
}
