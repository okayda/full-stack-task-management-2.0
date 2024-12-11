"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { TaskContentWrapper } from "./task-content-wrapper";

import { Task, StatusColumnItem } from "../types";

interface TaskContentModalProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };

  isOpen: boolean;
  onClose: () => void;
}

export function TaskContentModal({
  task,
  statusColumn,
  isOpen,
  onClose,
}: TaskContentModalProps) {
  return (
    <ResponsiveModal open={isOpen} onOpenChange={onClose}>
      <TaskContentWrapper
        onCancel={onClose}
        task={task}
        statusColumn={statusColumn}
      />
    </ResponsiveModal>
  );
}
