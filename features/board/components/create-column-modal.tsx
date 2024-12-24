"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateColumnForm } from "./create-column-form";

interface CreateColumnModalProps {
  isCreateColumnModalOpen: boolean;
  closeCreateColumnModal: () => void;
}

export const CreateColumnModal = function ({
  isCreateColumnModalOpen,
  closeCreateColumnModal,
}: CreateColumnModalProps) {
  return (
    <ResponsiveModal
      open={isCreateColumnModalOpen}
      onOpenChange={closeCreateColumnModal}
    >
      <CreateColumnForm closeCreateColumnModal={closeCreateColumnModal} />
    </ResponsiveModal>
  );
};
