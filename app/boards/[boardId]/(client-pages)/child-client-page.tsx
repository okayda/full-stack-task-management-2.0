"use client";

import { useGetTasks } from "@/features/board/api/use-get-tasks";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";
import Board from "@/features/board/components/board";

import { PageLoader } from "@/components/page-loader";

interface ChildClientProps {
  isDesktop: boolean;
}

export default function ChildClientPage({ isDesktop }: ChildClientProps) {
  const boardId = useGetBoardId();
  const { data, isPending } = useGetTasks({ boardId });

  if (isPending) {
    return <PageLoader />;
  }

  if (!data) {
    console.error("Failed to get tasks at child-client-page");
    return null;
  }

  return (
    <Board
      statusColumn={data.statusColumn}
      dataTasks={data.tasks}
      isDesktop={isDesktop}
    />
  );
}
