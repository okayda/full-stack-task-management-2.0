"use client";

import React from "react";
import { redirect } from "next/navigation";

import { useCreateExampleBoardData } from "@/features/board/api/use-create-example-board-data";
import GenerateExampleBox from "@/features/board/components/generate-example-box";
import GenerateExampleColumnBox from "@/features/board/components/generate-example-column-box";
import { useGetBoardNames } from "@/features/board/api/use-get-board-names";

import DashBoardLayout from "@/components/dash-board-layout";
import { PageLoader } from "@/components/page-loader";

export default function HomeClientPage() {
  const { data: fetchedBoardNames, isPending: isFetchingBoardNames } =
    useGetBoardNames();

  const userBoardNames = fetchedBoardNames?.boards || [];

  const { mutate: createExampleBoard, isPending: isCreatingExampleBoard } =
    useCreateExampleBoardData();

  if (userBoardNames.length) {
    redirect(`/boards/${userBoardNames[0].$id}`);
    return null;
  }

  if (isFetchingBoardNames) {
    return <PageLoader />;
  }

  if (!fetchedBoardNames) {
    console.error("Failed to fetch board names on the home-client-page");
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
          userBoardNames={userBoardNames}
        >
          <div className="flex flex-col">
            <div className="flex h-full flex-col justify-center">
              <div className="flex flex-col gap-y-8 md:mx-auto md:max-w-[43.75rem] md:flex-row md:gap-x-12 md:gap-y-0">
                <GenerateExampleBox
                  createExampleBoard={createExampleBoard}
                  isCreatingExampleBoard={isCreatingExampleBoard}
                />
                <GenerateExampleColumnBox
                  createBoardExample={createExampleBoard}
                  isCreatingBoardExample={isCreatingExampleBoard}
                  userBoardNames={userBoardNames}
                />
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
          userBoardNames={userBoardNames}
        >
          <div className="flex flex-col">
            <div className="flex h-[60vh] flex-col justify-center">
              <div className="mx-auto flex max-w-[43.75rem] gap-x-8">
                <GenerateExampleBox
                  createExampleBoard={createExampleBoard}
                  isCreatingExampleBoard={isCreatingExampleBoard}
                />
                <GenerateExampleColumnBox
                  createBoardExample={createExampleBoard}
                  isCreatingBoardExample={isCreatingExampleBoard}
                  userBoardNames={userBoardNames}
                />
              </div>
            </div>
          </div>
        </DashBoardLayout>
      </div>
    </React.Fragment>
  );
}
