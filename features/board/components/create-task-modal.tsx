"use client";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

import { StatusColumnItem } from "../types";

export function CreateTaskModal({
  statusColumn,
}: {
  statusColumn: StatusColumnItem[];
}) {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper statusColumn={statusColumn} onCancel={close} />
    </ResponsiveModal>
  );
}
