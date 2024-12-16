import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentUserBoards } from "@/features/board/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import GenerateExampleBox from "@/features/board/components/generate-example-box";

import DashBoardLayout from "@/components/dash-board-layout";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
    return null;
  }

  const userBoardsData = await getCurrentUserBoards();
  const hasBoardsData = userBoardsData.total > 0;

  if (hasBoardsData) {
    redirect(`/boards/${userBoardsData.documents[0].$id}`);
    return null;
  }

  return (
    <div>
      <CreateBoardModal />

      {/* Different layout different styles for Sidebar Component*/}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout
          isDesktop={false}
          isHomePage={true}
          hasBoardsData={hasBoardsData}
        >
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            <div className="flex h-[60vh] flex-col justify-center">
              <GenerateExampleBox />
            </div>
          </div>
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout
          isDesktop={true}
          isHomePage={true}
          hasBoardsData={hasBoardsData}
        >
          <div className="flex flex-col px-2 pb-0 pt-8 lg:px-6 lg:pt-10">
            <div className="flex h-[60vh] flex-col justify-center">
              <GenerateExampleBox />
            </div>
          </div>
        </DashBoardLayout>
      </div>
    </div>
  );
}
