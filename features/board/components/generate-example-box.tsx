"use client";

import { useState } from "react";

import { UseMutateFunction } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { client } from "@/lib/rpc";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { LoaderIcon } from "lucide-react";

type RequestType = InferRequestType<
  (typeof client.api.board)["create-example-board-data"]["$post"]
>;

interface GenerateExampleBoxProps {
  createExampleBoard: UseMutateFunction<
    ResponseType,
    Error,
    RequestType,
    unknown
  >;
  isCreatingExampleBoard: boolean;
}

export default function GenerateExampleBox({
  createExampleBoard,
  isCreatingExampleBoard,
}: GenerateExampleBoxProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickOnce = function () {
    if (!isClicked) {
      setIsClicked(true);

      createExampleBoard(
        {},
        {
          onError: () => {
            setIsClicked(false);
          },
        },
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-xs">
      <div className="flex h-full flex-col justify-between">
        <div>
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
            disabled={isCreatingExampleBoard || isClicked}
            onClick={handleClickOnce}
          >
            {isCreatingExampleBoard ? (
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
