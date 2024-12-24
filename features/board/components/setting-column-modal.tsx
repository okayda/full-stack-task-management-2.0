"use client";

import { Models } from "node-appwrite";

import { ResponsiveModal } from "@/components/responsive-modal";

import { SettingColumnForm } from "./setting-column-form";

import { StatusColumn } from "../types";

interface SettingColumnModalProps {
  userBoardNames: Models.Document[];
  statusColumn?: StatusColumn;

  isSettingColumnModalOpen: boolean;
  closeSettingColumnModal: () => void;
}

export function SettingColumnModal({
  statusColumn,
  userBoardNames,
  isSettingColumnModalOpen,
  closeSettingColumnModal,
}: SettingColumnModalProps) {
  return (
    <ResponsiveModal
      open={isSettingColumnModalOpen}
      onOpenChange={closeSettingColumnModal}
    >
      <SettingColumnForm
        userBoardNames={userBoardNames}
        statusColumn={statusColumn}
        closeSettingColumnModal={closeSettingColumnModal}
      />
    </ResponsiveModal>
  );
}
