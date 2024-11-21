import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { Task, TaskStatus } from "@/features/board/types";
import Board from "@/features/board/components/board";

import GridPattern from "@/components/ui/grid-pattern";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const dataExample: Task[] = [
  {
    $id: "1",
    name: "Setup project",
    status: TaskStatus.TODO,
    position: 1,
  },
  {
    $id: "2",
    name: "Implement authentication",
    status: TaskStatus.IN_PROGRESS,
    position: 2,
  },
  {
    $id: "3",
    name: "Code review",
    status: TaskStatus.IN_REVIEW,
    position: 3,
  },
  {
    $id: "4",
    name: "Bug fix: Login issue",
    status: TaskStatus.IN_PROGRESS,
    position: 4,
  },
  {
    $id: "5",
    name: "Deploy application",
    status: TaskStatus.DONE,
    position: 5,
  },
  // {
  //   $id: "6",
  //   name: "Deploy application",
  //   status: TaskStatus.ONE,
  //   position: 6,
  // },
];

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  return (
    <main>
      <GridPattern
        className="fixed left-0 top-0 -z-[5] h-full w-screen stroke-neutral-300/25"
        strokeDasharray="4 2"
      />

      <CreateBoardModal />

      <div className="flex">
        <div className="fixed left-0 top-0 hidden h-full lg:block lg:w-[280px]">
          <Sidebar />
        </div>

        <div className="w-full lg:pl-[280px]">
          <div className="mx-auto max-w-[1500px]">
            <Navbar />

            <div className="flex flex-col px-6 pb-0 pt-8 lg:pt-10">
              <Board data={dataExample} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
