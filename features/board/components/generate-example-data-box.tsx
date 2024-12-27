"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { MdOutlineDashboard } from "react-icons/md";
import { LoaderIcon } from "lucide-react";

interface GenerateExampleDataBoxProps {
  isCreatingExampleData: boolean;
  handlerClickOnceExampleData: () => void;
  isExampleClicked: boolean;
}

export default function GenerateExampleDataBox({
  isCreatingExampleData,
  handlerClickOnceExampleData,
  isExampleClicked,
}: GenerateExampleDataBoxProps) {
  return (
    <Card className="mx-auto w-full max-w-xs">
      <div className="flex h-full flex-col justify-between">
        <div className="relative">
          <MdOutlineDashboard className="absolute right-3 top-2 size-6 text-xl" />

          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Columns & Tasks</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center space-y-6 px-6">
            <p className="font-geist text-sm text-muted-foreground">
              This feature populates the board with example columns and tasks,
              allowing you to{" "}
              <span className="font-semibold text-primary">
                explore the full functionality
              </span>{" "}
              of the kanban board. It helps you understand how tasks and columns
              work together to create an organized, visual workflow.
            </p>
          </CardContent>
        </div>

        <div className="px-6 pb-6">
          <RainbowButton
            className="h-[2.625rem] w-full rounded-md font-geist text-[0.9375rem]"
            disabled={isCreatingExampleData || isExampleClicked}
            onClick={handlerClickOnceExampleData}
          >
            {isCreatingExampleData ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              " Generate Both"
            )}
          </RainbowButton>
        </div>
      </div>
    </Card>
  );
}
