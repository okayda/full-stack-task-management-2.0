import { Models } from "node-appwrite";

import { useSettingColumnModal } from "@/features/board/hooks/use-setting-column-modal";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";

import { Button } from "./ui/button";

import { CogIcon } from "lucide-react";

interface NavbarProps {
  userBoardsData?: Models.DocumentList<Models.Document>;
}

export default function Navbar({ userBoardsData }: NavbarProps) {
  const boardId = useGetBoardId();
  const { open: openSettingModal } = useSettingColumnModal();

  if (!userBoardsData) {
    console.error("user boards data not found at Navbar");
    return null;
  }

  const board = userBoardsData.documents.find((board) => board.$id === boardId);

  if (!board) {
    console.error("target board using board id not found at Navbar");
    return null;
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-full justify-between">
        <h1 className="font-roboto self-center text-2xl font-medium md:text-3xl">
          {board.boardName}
        </h1>

        <Button
          className="rounded-lg border border-neutral-400/50 px-2.5 tracking-wide md:px-6"
          variant="secondary"
          onClick={openSettingModal}
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
