import React, { useState } from "react";

import { Models } from "node-appwrite";

import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";
import { useGetBoardData } from "@/features/board/api/use-get-board-data";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";

import { Button } from "./ui/button";

import { Settings2Icon, PanelRightCloseIcon, Loader } from "lucide-react";

interface NavbarBoardProps {
  userBoardNames: Models.Document[];
  toggleSidebar: () => void;
}

export default function NavbarBoard({
  userBoardNames,
  toggleSidebar,
}: NavbarBoardProps) {
  const boardId = useGetBoardId();
  const { data, isPending } = useGetBoardData({ boardId });

  const [isSettingColumnModalOpen, setIsSettingColumnModalOpen] =
    useState(false);

  const openSettingColumnModal = () => setIsSettingColumnModalOpen(true);
  const closeSettingColumnModal = () => setIsSettingColumnModalOpen(false);

  const board = userBoardNames?.find((board) => board.$id === boardId);

  return (
    <React.Fragment>
      <SettingColumnModal
        userBoardNames={userBoardNames}
        statusColumn={data?.statusColumn}
        isSettingColumnModalOpen={isSettingColumnModalOpen}
        closeSettingColumnModal={closeSettingColumnModal}
      />

      <nav className="flex items-center justify-between">
        <div className="flex w-full justify-between">
          <h1 className="self-center font-roboto text-2xl font-medium text-primary md:text-3xl">
            {board?.boardName}
          </h1>

          <div className="flex items-center gap-x-2">
            {/* for mobile & tablet sidebar  */}
            <Button
              className="rounded-lg border border-neutral-300/80 px-2.5 tracking-wide md:px-6 lg:hidden"
              variant="secondary"
              onClick={toggleSidebar}
            >
              <PanelRightCloseIcon className="sm:hidden" />

              <span className="hidden sm:block">Open Sidebar</span>
            </Button>

            {/* for mobile & tablet setting modal   */}
            <Button
              className="rounded-lg border border-neutral-300/80 px-2.5 tracking-wide sm:hidden md:px-6"
              variant="secondary"
              onClick={openSettingColumnModal}
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="!size-5 animate-spin" />
              ) : (
                <Settings2Icon />
              )}
            </Button>

            {/* for desktop setting modal   */}
            <Button
              className="hidden rounded-lg border border-neutral-300/80 px-2.5 tracking-wide sm:block md:px-6"
              variant="secondary"
              onClick={openSettingColumnModal}
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="!size-5 animate-spin" />
              ) : (
                "Setting"
              )}
            </Button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
