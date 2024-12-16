"use client";

import { useSettingColumnModal } from "../hooks/use-setting-column-modal";

import { ResponsiveModal } from "@/components/responsive-modal";

import { SettingColumnForm } from "./setting-column-form";

export function SettingColumnModal() {
  const { isOpen, setIsOpen, close } = useSettingColumnModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <SettingColumnForm closeSettingColumnForm={close} />
    </ResponsiveModal>
  );
}
