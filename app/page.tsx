import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { CreateTaskModal } from "@/features/board/components/create-task-modal";
// import { Task, TaskStatus } from "@/features/board/types";
// import Board from "@/features/board/components/board";

import GridPattern from "@/components/ui/grid-pattern";
import DashBoardLayout from "@/components/dash-board-layout";

// const dataExample: Task[] = [
//   {
//     $id: "1",
//     priority: "Lowest",
//     name: "Setup project",
//     status: TaskStatus.TODO,
//     position: 1,
//   },
//   {
//     $id: "2",
//     priority: "Low",
//     name: "Implement authentication",
//     status: TaskStatus.IN_PROGRESS,
//     position: 2,
//   },
//   {
//     $id: "3",
//     priority: "Highest",
//     name: "Code review",
//     status: TaskStatus.IN_REVIEW,
//     position: 3,
//   },
//   {
//     $id: "4",
//     priority: "Medium",
//     name: "Bug fix: Login issue",
//     status: TaskStatus.IN_PROGRESS,
//     position: 4,
//   },
//   {
//     $id: "5",
//     priority: "High",
//     name: "Deploy application",
//     status: TaskStatus.DONE,
//     position: 5,
//   },
// ];

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

      <CreateTaskModal />

      {/* Different layout different functionalities */}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout isDesktop={false}>
          <div className="flex flex-col pb-0 pl-2 pt-8 lg:px-6 lg:pt-10">
            {/* <Board data={dataExample} isDesktop={false} /> */}
          </div>
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout isDesktop={true}>
          <div className="flex flex-col pb-0 pl-2 pt-8 lg:px-6 lg:pt-10">
            {/* <Board data={dataExample} isDesktop={true} /> */}
          </div>
        </DashBoardLayout>
      </div>
    </main>
  );
}
