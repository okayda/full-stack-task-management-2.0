import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { SettingColumnModal } from "@/features/board/components/setting-column-modal";
import { CreateColumnModal } from "@/features/board/components/create-column-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";
import GenerateExampleBox from "@/features/board/components/generate-example-box";

import GridPattern from "@/components/ui/grid-pattern";
import DashBoardLayout from "@/components/dash-board-layout";

import { statusColumnExample } from "@/lib/exampleData";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  const hasBoardData = false;

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
        <DashBoardLayout isDesktop={false} hasBoardData={hasBoardData}>
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            {/* <Board
              data={dataExample}
              statusColumn={statusColumnExample}
              isDesktop={false}
            /> */}
            <div className="flex h-[60vh] flex-col justify-center">
              <GenerateExampleBox />
            </div>
          </div>
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout isDesktop={true} hasBoardData={hasBoardData}>
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            {/* <Board
              data={dataExample}
              statusColumn={statusColumnExample}
              isDesktop={true}
            /> */}
            <div className="flex h-[60vh] flex-col justify-center">
              <GenerateExampleBox />
            </div>
          </div>
        </DashBoardLayout>
      </div>
    </main>
  );
}
