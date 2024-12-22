import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentUserBoards } from "@/features/board/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import GenerateExampleBox from "@/features/board/components/generate-example-box";
import GenerateExampleColumnBox from "@/features/board/components/generate-example-column-box";

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
        <DashBoardLayout isDesktop={false} isHomePage={true}>
          <div className="flex flex-col">
            <div className="flex h-full flex-col justify-center">
              <div className="flex flex-col gap-y-8 md:mx-auto md:max-w-[43.75rem] md:flex-row md:gap-x-12 md:gap-y-0">
                <GenerateExampleBox />
                <GenerateExampleColumnBox />
              </div>
            </div>
          </div>
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout isDesktop={true} isHomePage={true}>
          <div className="flex flex-col">
            <div className="flex h-[60vh] flex-col justify-center">
              <div className="mx-auto flex max-w-[43.75rem] gap-x-8">
                <GenerateExampleBox />
                <GenerateExampleColumnBox />
              </div>
            </div>
          </div>
        </DashBoardLayout>
      </div>
    </div>
  );
}
