"use client";

import { useCreateColumnModal } from "../hooks/use-create-column-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateColumnForm } from "./create-column-form";

export const CreateColumnModal = function () {
  const { isOpen, setIsOpen, close } = useCreateColumnModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateColumnForm onCancel={close} />
    </ResponsiveModal>
  );
};
