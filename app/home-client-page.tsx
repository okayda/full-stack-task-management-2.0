"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";

import { useGetBoardNames } from "@/features/board/api/use-get-board-names";
import { useCreateExampleBoardData } from "@/features/board/api/use-create-example-board-data";
import { useCreateExampleBoardColumns } from "@/features/board/api/use-create-example-board-columns";
import GenerateExampleDataBox from "@/features/board/components/generate-example-data-box";
import GenerateExampleColumnBox from "@/features/board/components/generate-example-column-box";

import DashBoardLayout from "@/components/dash-board-layout";
import { PageLoader } from "@/components/page-loader";

export default function HomeClientPage() {
  const [isExampleClicked, setIsExampleClicked] = useState(false);

  // The fetch will not be re-executed even if the component re-renders,
  // as long as the staleTime (2 minutes) has not passed.
  // otherwise it will reuse the cached data if the component re-renders
  const { data: fetchedBoardNames, isPending: isFetchingBoardNames } =
    useGetBoardNames();

  const userBoardNames = fetchedBoardNames?.boards || [];

  const { mutate: createExampleData, isPending: isCreatingExampleData } =
    useCreateExampleBoardData();

  const { mutate: createExampleColumns, isPending: isCreatingExampleColumns } =
    useCreateExampleBoardColumns();

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

  const handlerClickOnceExampleData = function () {
    if (!isExampleClicked) {
      setIsExampleClicked(true);

      createExampleData(
        {},
        {
          onError: () => {
            setIsExampleClicked(false);
          },
        },
      );
    }
  };

  const handlerClickOnceExampleColumns = function () {
    if (!isExampleClicked) {
      setIsExampleClicked(true);

      createExampleColumns(
        {},
        {
          onError: () => {
            setIsExampleClicked(false);
          },
        },
      );
    }
  };

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
                <GenerateExampleDataBox
                  isCreatingExampleData={isCreatingExampleData}
                  handlerClickOnceExampleData={handlerClickOnceExampleData}
                  isExampleClicked={isExampleClicked}
                />

                <GenerateExampleColumnBox
                  isCreatingExampleColumns={isCreatingExampleColumns}
                  handlerClickOnceExampleColumns={
                    handlerClickOnceExampleColumns
                  }
                  isExampleClicked={isExampleClicked}
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
                <GenerateExampleDataBox
                  isCreatingExampleData={isCreatingExampleData}
                  handlerClickOnceExampleData={handlerClickOnceExampleData}
                  isExampleClicked={isExampleClicked}
                />

                <GenerateExampleColumnBox
                  isCreatingExampleColumns={isCreatingExampleColumns}
                  handlerClickOnceExampleColumns={
                    handlerClickOnceExampleColumns
                  }
                  isExampleClicked={isExampleClicked}
                />
              </div>
            </div>
          </div>
        </DashBoardLayout>
      </div>
    </React.Fragment>
  );
}
