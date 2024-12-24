"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { EditTaskForm } from "./edit-task-form";

import { StatusColumn, Task } from "../types";

interface EditTaskModalProps {
  task: Task;
  statusColumn: StatusColumn;

  closeTaskContentModal: () => void;

  isEditTaskModalOpen: boolean;
  closeEditTaskModal: () => void;
}

export function EditTaskModal({
  task,
  statusColumn,
  closeTaskContentModal,
  isEditTaskModalOpen,
  closeEditTaskModal,
}: EditTaskModalProps) {
  return (
    <ResponsiveModal
      open={isEditTaskModalOpen}
      onOpenChange={closeEditTaskModal}
    >
      <EditTaskForm
        task={task}
        statusColumn={statusColumn}
        closeEditTaskModal={closeEditTaskModal}
        closeTaskContentModal={closeTaskContentModal}
      />
    </ResponsiveModal>
  );
}
