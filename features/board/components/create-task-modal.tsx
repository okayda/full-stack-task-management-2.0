"use client";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export function CreateTaskModal() {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
