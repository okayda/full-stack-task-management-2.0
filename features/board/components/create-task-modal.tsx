"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskForm } from "./create-task-form";
import { StatusColumn } from "../types";

interface CreateTaskModalProps {
  statusColumn: StatusColumn;

  isCreateTaskModalOpen: boolean;
  closeCreateTaskModal: () => void;
}

export function CreateTaskModal({
  statusColumn,
  isCreateTaskModalOpen,
  closeCreateTaskModal,
}: CreateTaskModalProps) {
  return (
    <ResponsiveModal
      open={isCreateTaskModalOpen}
      onOpenChange={closeCreateTaskModal}
    >
      <CreateTaskForm
        statusColumn={statusColumn}
        closeCreateTaskModal={closeCreateTaskModal}
      />
    </ResponsiveModal>
  );
}
