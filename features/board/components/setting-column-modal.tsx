"use client";

import { Models } from "node-appwrite";

import { useSettingColumnModal } from "../hooks/use-setting-column-modal";

import { ResponsiveModal } from "@/components/responsive-modal";

import { SettingColumnForm } from "./setting-column-form";

import { StatusColumnItem } from "../types";

interface SettingColumnModalProps {
  userBoardsData: Models.DocumentList<Models.Document>;
  statusColumn: StatusColumnItem[];
}

export function SettingColumnModal({
  userBoardsData,
  statusColumn,
}: SettingColumnModalProps) {
  const { isOpen, setIsOpen, close } = useSettingColumnModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <SettingColumnForm
        closeSettingColumnForm={close}
        userBoardsData={userBoardsData}
        statusColumn={statusColumn}
      />
    </ResponsiveModal>
  );
}
