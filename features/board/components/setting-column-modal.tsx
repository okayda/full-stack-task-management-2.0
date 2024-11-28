"use client";

import { useSettingColumnModal } from "../hooks/use-setting-column-modal";

import { ResponsiveModal } from "@/components/responsive-modal";
import { SettingColumnFormWrapper } from "./setting-column-wrapper";

export function SettingColumnModal() {
  const { isOpen, setIsOpen, close } = useSettingColumnModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <SettingColumnFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
}
