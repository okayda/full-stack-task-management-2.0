"use client";

import { useGetBoardData } from "@/features/board/api/use-get-board-data";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";
import Board from "@/features/board/components/board";

import { PageLoader } from "@/components/page-loader";

interface ChildClientProps {
  isDesktop: boolean;
}

export default function ChildClientPage({ isDesktop }: ChildClientProps) {
  const boardId = useGetBoardId();
  const { data: fetchedBoardData, isPending: isFetchingBoardData } =
    useGetBoardData({ boardId });

  if (isFetchingBoardData) {
    return <PageLoader />;
  }

  if (!fetchedBoardData) {
    console.error("Failed to fetch board data on the child-client-page");
    return null;
  }

  return (
    <Board
      statusColumn={fetchedBoardData.statusColumn}
      tasks={fetchedBoardData.tasks}
      isDesktop={isDesktop}
    />
  );
}
