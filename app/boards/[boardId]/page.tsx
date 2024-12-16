import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentUserBoards } from "@/features/board/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";
import { CreateColumnModal } from "@/features/board/components/create-column-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";

import DashBoardLayout from "@/components/dash-board-layout";

import { statusColumnExample } from "@/lib/exampleBoardData";
import BoardClientPage from "./client-page";

export default async function BoardIdPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
    return null;
  }

  const userBoardsData = await getCurrentUserBoards();
  const hasBoardsData = userBoardsData.total > 0;

  if (!hasBoardsData) {
    redirect("/");
    return null;
  }

  return (
    <div>
      <CreateBoardModal />

      <SettingColumnModal />

      <CreateColumnModal />

      <CreateTaskModal statusColumn={statusColumnExample} />

      {/* Different layout different functionalities for Board Component */}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout
          isDesktop={false}
          isHomePage={false}
          hasBoardsData={hasBoardsData}
          userBoardsData={userBoardsData}
        >
          <BoardClientPage isDesktop={false} />
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout
          isDesktop={true}
          isHomePage={false}
          hasBoardsData={hasBoardsData}
          userBoardsData={userBoardsData}
        >
          <BoardClientPage isDesktop={true} />
        </DashBoardLayout>
      </div>
    </div>
  );
}
