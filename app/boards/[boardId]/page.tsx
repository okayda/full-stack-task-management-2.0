import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentUserBoards } from "@/features/board/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";
import { CreateColumnModal } from "@/features/board/components/create-column-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";
import { EditTaskModal } from "@/features/board/components/edit-task-modal";

import DashBoardLayout from "@/components/dash-board-layout";

import { statusColumnExample } from "@/lib/exampleData";
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

      <EditTaskModal statusColumn={statusColumnExample} />

      {/* Different layout different functionalities */}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout
          isDesktop={false}
          isHomePage={false}
          hasBoardsData={hasBoardsData}
          userBoardsData={userBoardsData}
        >
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            <BoardClientPage isDesktop={false} />
          </div>
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
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            <BoardClientPage isDesktop={true} />
          </div>
        </DashBoardLayout>
      </div>
    </div>
  );
}
