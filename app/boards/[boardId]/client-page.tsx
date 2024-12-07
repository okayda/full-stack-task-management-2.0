"use client";

import { PageLoader } from "@/components/page-loader";

import { useGetTasks } from "@/features/board/api/use-get-tasks";
import { useGetBoardId } from "@/features/board/hooks/use-board-id";
import Board from "@/features/board/components/board";

interface BoardClientProps {
  isDesktop: boolean;
}

export default function BoardClientPage({ isDesktop }: BoardClientProps) {
  const boardId = useGetBoardId();
  const { data, isPending } = useGetTasks({ boardId });

  if (isPending) {
    return <PageLoader />;
  }

  if (!isPending && !data) {
    console.error("Failed to get your board data at Board Client Page");
    return null;
  }

  return (
    <div>
      <Board
        dataTasks={data?.tasks}
        statusColumn={data?.statusColumn}
        isDesktop={isDesktop}
      />
    </div>
  );
}
