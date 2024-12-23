import { Models } from "node-appwrite";

import { useSettingColumnModal } from "@/features/board/hooks/use-setting-column-modal";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";

import { Button } from "./ui/button";

import { Settings2Icon, PanelRightCloseIcon } from "lucide-react";

interface NavbarProps {
  isHomePage?: boolean;
  toggleSidebar: () => void;
  userBoardsData?: Models.Document[];
}

export default function Navbar({
  isHomePage,
  toggleSidebar,
  userBoardsData,
}: NavbarProps) {
  const boardId = useGetBoardId();
  const { open: openSettingModal } = useSettingColumnModal();

  const board = userBoardsData?.find((board) => board.$id === boardId);

  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-full justify-between">
        <h1 className="self-center font-roboto text-2xl font-medium text-primary md:text-3xl">
          {isHomePage ? "Welcome" : board?.boardName}
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
          {isHomePage || (
            <Button
              className="rounded-lg border border-neutral-300/80 px-2.5 tracking-wide sm:hidden md:px-6"
              variant="secondary"
              onClick={openSettingModal}
              disabled={isHomePage}
            >
              <Settings2Icon />
            </Button>
          )}

          {/* for desktop setting modal   */}
          {isHomePage || (
            <Button
              className="hidden rounded-lg border border-neutral-300/80 px-2.5 tracking-wide sm:block md:px-6"
              variant="secondary"
              onClick={openSettingModal}
              disabled={isHomePage}
            >
              Setting
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
