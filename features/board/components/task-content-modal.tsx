"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import TaskContent from "./task-content";

import { Task, StatusColumnItem } from "../types";

interface TaskContentModalProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };

  isTaskModalOpen: boolean;
  closeTaskModal: () => void;
}

export function TaskContentModal({
  task,
  statusColumn,
  isTaskModalOpen,
  closeTaskModal,
}: TaskContentModalProps) {
  return (
    <ResponsiveModal open={isTaskModalOpen} onOpenChange={closeTaskModal}>
      <TaskContent
        task={task}
        statusColumn={statusColumn}
        closeTaskModal={closeTaskModal}
      />
    </ResponsiveModal>
  );
}
