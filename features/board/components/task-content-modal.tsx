"use client";

import { useTaskContentModal } from "../hooks/use-task-content-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { TaskContentWrapper } from "./task-content-wrapper";

import { StatusColumn } from "../types";

export function TaskContentModal({
  statusColumn,
}: {
  statusColumn: StatusColumn[];
}) {
  const { isOpen, setIsOpen, close } = useTaskContentModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <TaskContentWrapper statusColumn={statusColumn} onCancel={close} />
    </ResponsiveModal>
  );
}
