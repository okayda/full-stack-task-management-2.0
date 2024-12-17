"use client";

import { useCreateColumnModal } from "../hooks/use-create-column-modal";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateColumnForm } from "./create-column-form";

import { StatusColumnItem } from "../types";

interface CreateColumnModalProps {
  statusColumn: StatusColumnItem[];
}

export const CreateColumnModal = function ({
  statusColumn,
}: CreateColumnModalProps) {
  const { isOpen, setIsOpen, close } = useCreateColumnModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateColumnForm closeCreateColumnForm={close} />
    </ResponsiveModal>
  );
};
