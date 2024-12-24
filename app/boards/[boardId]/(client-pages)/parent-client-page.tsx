"use client";

import React from "react";
import { redirect } from "next/navigation";

import { useGetBoards } from "@/features/board/api/use-get-boards";

import DashBoardLayout from "@/components/dash-board-layout";
import GridPattern from "@/components/ui/grid-pattern";
import { PageLoader } from "@/components/page-loader";

import ChildClientPage from "./child-client-page";

export default function ParentClientPage() {
  const { data, isPending } = useGetBoards();
  const userBoardsData = data?.boards || [];

  if (isPending) {
    return <PageLoader />;
  }

  if (!data) {
    console.error("Failed to get boards at parent-client-page");
    return null;
  }

  if (userBoardsData.length === 0) {
    redirect("/");
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
          userBoardsData={userBoardsData}
        >
          <ChildClientPage isDesktop={false} />
        </DashBoardLayout>
      </div>

      {/* For desktop */}
      <div className="hidden lg:block">
        <DashBoardLayout
          isDesktop={true}
          isHomePage={false}
          userBoardsData={userBoardsData}
        >
          <ChildClientPage isDesktop={true} />
        </DashBoardLayout>
      </div>
    </React.Fragment>
  );
}
