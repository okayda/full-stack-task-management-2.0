"use client";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

import { StatusColumn } from "../types";

export function CreateTaskModal({
  statusColumn,
}: {
  statusColumn: StatusColumn[];
}) {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper statusColumn={statusColumn} onCancel={close} />
    </ResponsiveModal>
  );
}
