"use client";

import React from "react";
import { redirect } from "next/navigation";

import { useGetBoardNames } from "@/features/board/api/use-get-board-names";

import DashBoardLayout from "@/components/dash-board-layout";
import GridPattern from "@/components/ui/grid-pattern";
import { PageLoader } from "@/components/page-loader";

import ChildClientPage from "./child-client-page";
import { useGetBoardId } from "@/features/board/hooks/use-get-board-id";

export default function ParentClientPage() {
  const { data: fetchedBoardNames, isPending: isFetchingBoardNames } =
    useGetBoardNames();

  const currentBoardId = useGetBoardId();

  const userBoardNames = fetchedBoardNames?.boards || [];

  if (isFetchingBoardNames) {
    return <PageLoader />;
  }

  if (!fetchedBoardNames) {
    console.error("Failed to fetch board names on the parent-client-page");
    return null;
  }

  if (userBoardNames.length === 0) {
    redirect("/");
    return null;
  }

  // Redirect to the first available board if the current board is deleted
  if (!userBoardNames.some((board) => board.$id === currentBoardId)) {
    const targetBoard = userBoardNames[0];
    if (targetBoard) {
      redirect(`/boards/${targetBoard.$id}`);
    } else redirect("/");

    return null;
  }

  return (
    <React.Fragment>
      <GridPattern
        className="fixed left-0 top-0 -z-[10] h-full w-screen stroke-neutral-300/25"
        strokeDasharray="4 2"
      />

      {/* Different layout different functionalities for Board Component */}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout
          isDesktop={false}
          isHomePage={false}
          userBoardNames={userBoardNames}
        >
          <ChildClientPage isDesktop={false} />
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout
          isDesktop={true}
          isHomePage={false}
          userBoardNames={userBoardNames}
        >
          <ChildClientPage isDesktop={true} />
        </DashBoardLayout>
      </div>
    </React.Fragment>
  );
}
