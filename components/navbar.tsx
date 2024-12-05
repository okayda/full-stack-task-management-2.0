import { Models } from "node-appwrite";

import { useSettingColumnModal } from "@/features/board/hooks/use-setting-column-modal";
import { useGetBoardId } from "@/features/board/hooks/use-board-id";

import { Button } from "./ui/button";

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
    <nav className="flex items-center justify-between px-4 pt-6 lg:px-[30px]">
      <div className="flex w-full justify-between pt-6">
        <h1 className="self-center text-2xl font-medium md:text-3xl">
          {board.boardName}
        </h1>

        <Button
          className="rounded-full px-6 tracking-wide"
          onClick={openSettingModal}
        >
          Settings
        </Button>
      </div>
    </nav>
  );
}
