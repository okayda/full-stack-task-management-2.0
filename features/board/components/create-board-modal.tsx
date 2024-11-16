"use client";

import { useCreateBoardModal } from "../hooks/use-create-board-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateBoardForm } from "./create-board-form";

export const CreateBoardModal = function () {
  const { isOpen, setIsOpen, close } = useCreateBoardModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateBoardForm onCancel={close} />
    </ResponsiveModal>
  );
};
