"use client";

import React from "react";
import { redirect } from "next/navigation";

import GenerateExampleBox from "@/features/board/components/generate-example-box";
import GenerateExampleColumnBox from "@/features/board/components/generate-example-column-box";
import { useGetBoards } from "@/features/board/api/use-get-boards";

import DashBoardLayout from "@/components/dash-board-layout";
import { PageLoader } from "@/components/page-loader";

export default function HomeClientPage() {
  const { data, isPending } = useGetBoards();
  const userBoardsData = data?.boards || [];

  if (isPending) {
    return <PageLoader />;
  }

  if (!data) {
    console.error("Failed to get boards at home-client-page");
    return null;
  }

  if (userBoardsData.length > 0) {
    redirect(`/boards/${userBoardsData[0].$id}`);
    return null;
  }

  return (
    <React.Fragment>
      {/* Different layout different styles for Sidebar Component*/}

      {/* For tablet */}
      <div className="lg:hidden">
        <DashBoardLayout
          isDesktop={false}
          isHomePage={true}
          userBoardsData={userBoardsData}
        >
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
        <DashBoardLayout
          isDesktop={true}
          isHomePage={true}
          userBoardsData={userBoardsData}
        >
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
    </React.Fragment>
  );
}
