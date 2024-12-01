import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";
import { CreateColumnModal } from "@/features/board/components/create-column-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";
import Board from "@/features/board/components/board";

import GridPattern from "@/components/ui/grid-pattern";
import DashBoardLayout from "@/components/dash-board-layout";

import { dataExample, statusColumnExample } from "@/lib/exampleData";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  return (
    <main>
      <GridPattern
        className="fixed left-0 top-0 -z-[10] h-full w-screen stroke-neutral-300/25"
        strokeDasharray="4 2"
      />

      <CreateBoardModal />

      <SettingColumnModal />

      <CreateColumnModal />

      <CreateTaskModal statusColumn={statusColumnExample} />

      {/* Different layout different functionalities */}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout isDesktop={false}>
          <div className="flex flex-col pb-0 pl-2 pt-8 lg:px-6 lg:pt-10">
            {/* <Board
              data={dataExample}
              statusColumn={statusColumnExample}
              isDesktop={false}
            /> */}
          </div>
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout isDesktop={true}>
          <div className="flex flex-col pb-0 pl-2 pt-8 lg:px-6 lg:pt-10">
            {/* <Board
              data={dataExample}
              statusColumn={statusColumnExample}
              isDesktop={true}
            /> */}
          </div>
        </DashBoardLayout>
      </div>
    </main>
  );
}
