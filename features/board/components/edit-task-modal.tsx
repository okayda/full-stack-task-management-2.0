"use client";

import { useEditTaskModal } from "../hooks/use-edit-task-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

import { StatusColumn } from "../types";

export function EditTaskModal({
  statusColumn,
}: {
  statusColumn: StatusColumn[];
}) {
  const { isOpen, setIsOpen, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditTaskFormWrapper statusColumn={statusColumn} onCancel={close} />
    </ResponsiveModal>
  );
}
