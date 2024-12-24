"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateBoardForm } from "./create-board-form";

interface CreateBoardModalProps {
  isCreateBoardModalOpen: boolean;
  closeCreateBoardModal: () => void;
}

export const CreateBoardModal = function ({
  isCreateBoardModalOpen,
  closeCreateBoardModal,
}: CreateBoardModalProps) {
  return (
    <ResponsiveModal
      open={isCreateBoardModalOpen}
      onOpenChange={closeCreateBoardModal}
    >
      <CreateBoardForm closeCreateBoardModal={closeCreateBoardModal} />
    </ResponsiveModal>
  );
};
