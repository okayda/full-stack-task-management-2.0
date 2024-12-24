"use client";

import { Models } from "node-appwrite";

import { ResponsiveModal } from "@/components/responsive-modal";

import { SettingColumnForm } from "./setting-column-form";

import { StatusColumn } from "../types";

interface SettingColumnModalProps {
  userBoardsData: Models.Document[];
  statusColumn?: StatusColumn;

  isSettingColumnModalOpen: boolean;
  closeSettingColumnModal: () => void;
}

export function SettingColumnModal({
  statusColumn,
  userBoardsData,
  isSettingColumnModalOpen,
  closeSettingColumnModal,
}: SettingColumnModalProps) {
  return (
    <ResponsiveModal
      open={isSettingColumnModalOpen}
      onOpenChange={closeSettingColumnModal}
    >
      <SettingColumnForm
        userBoardsData={userBoardsData}
        statusColumn={statusColumn}
        closeSettingColumnModal={closeSettingColumnModal}
      />
    </ResponsiveModal>
  );
}
