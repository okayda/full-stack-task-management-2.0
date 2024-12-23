"use client";

import { PageLoader } from "@/components/page-loader";

import { useGetTasks } from "@/features/board/api/use-get-tasks";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";
import Board from "@/features/board/components/board";

interface ChildClientProps {
  isDesktop: boolean;
}

export default function ChildClientPage({ isDesktop }: ChildClientProps) {
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
    <Board
      dataTasks={data.tasks}
      statusColumn={data.statusColumn}
      isDesktop={isDesktop}
    />
  );
}
