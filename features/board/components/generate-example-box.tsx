"use client";

import { useCreateExampleBoardData } from "../api/use-create-example-board-data";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card, CardContent } from "@/components/ui/card";

import { LoaderIcon } from "lucide-react";

export default function GenerateExampleBox() {
  const { mutate: createBoardExample, isPending: isCreatingBoardExample } =
    useCreateExampleBoardData();

  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
        <p className="text-center text-sm text-muted-foreground">
          You want to populate the board with example tasks & columns. This
          feature helps you explore the kanban board functionality & understand
          how tasks can be managed visually.
        </p>

        <RainbowButton
          className="w-full text-[15px]"
          disabled={isCreatingBoardExample}
          onClick={createBoardExample}
        >
          {isCreatingBoardExample ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            " Generate Example"
          )}
        </RainbowButton>
      </CardContent>
    </Card>
  );
}
