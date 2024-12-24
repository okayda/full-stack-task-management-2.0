"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import TaskContent from "./task-content";

import { StatusColumn, Task } from "../types";

interface TaskContentModalProps {
  task: Task;
  statusColumn: StatusColumn;

  isTaskContentModalOpen: boolean;
  closeTaskContentModal: () => void;
}

export function TaskContentModal({
  task,
  statusColumn,
  isTaskContentModalOpen,
  closeTaskContentModal,
}: TaskContentModalProps) {
  return (
    <ResponsiveModal
      open={isTaskContentModalOpen}
      onOpenChange={closeTaskContentModal}
    >
      <TaskContent
        task={task}
        statusColumn={statusColumn}
        closeTaskContentModal={closeTaskContentModal}
      />
    </ResponsiveModal>
  );
}
