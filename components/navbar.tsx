import { Models } from "node-appwrite";

import { useSettingColumnModal } from "@/features/board/hooks/use-setting-column-modal";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";

import { Button } from "./ui/button";

import { CogIcon } from "lucide-react";

interface NavbarProps {
  isHomePage?: boolean;
  userBoardsData?: Models.DocumentList<Models.Document>;
}

export default function Navbar({ isHomePage, userBoardsData }: NavbarProps) {
  const boardId = useGetBoardId();
  const { open: openSettingModal } = useSettingColumnModal();

  const board = userBoardsData?.documents.find(
    (board) => board.$id === boardId,
  );

  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-full justify-between">
        <h1 className="self-center font-roboto text-2xl font-medium md:text-3xl">
          {isHomePage ? "Welcome" : board?.boardName}
        </h1>

        <Button
          className="rounded-lg border border-neutral-300/80 px-2.5 tracking-wide md:px-6"
          variant="secondary"
          onClick={openSettingModal}
          disabled={isHomePage}
        >
          <span className="md:hidden">
            <CogIcon className="!size-5" />
          </span>

          <span className="hidden md:block">Setting</span>
        </Button>
      </div>
    </nav>
  );
}
