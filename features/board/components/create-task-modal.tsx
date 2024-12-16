"use client";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateTaskForm } from "./create-task-form";

import { StatusColumnItem } from "../types";

interface CreateTaskModalProps {
  statusColumn: StatusColumnItem[];
}

export function CreateTaskModal({ statusColumn }: CreateTaskModalProps) {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskForm statusColumn={statusColumn} closeCreateTaskForm={close} />
    </ResponsiveModal>
  );
}
