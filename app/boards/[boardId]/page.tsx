import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentUserBoards } from "@/features/board/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";
import { CreateColumnModal } from "@/features/board/components/create-column-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";

import DashBoardLayout from "@/components/dash-board-layout";
import GridPattern from "@/components/ui/grid-pattern";

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
      <GridPattern
        className="fixed left-0 top-0 -z-[10] h-full w-screen stroke-neutral-300/25"
        strokeDasharray="4 2"
      />

      <CreateBoardModal />

      <SettingColumnModal
        userBoardsData={userBoardsData}
        statusColumn={statusColumnExample}
      />

      <CreateColumnModal statusColumn={statusColumnExample} />

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
