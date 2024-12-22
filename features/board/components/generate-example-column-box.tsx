"use client";

import { useCreateExampleBoardData } from "../api/use-create-example-board-data";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GenerateExampleColumnBox() {
  const { mutate: createBoardExample, isPending: isCreatingBoardExample } =
    useCreateExampleBoardData();

  return (
    <Card className="mx-auto w-full max-w-xs">
      <div className="flex h-full flex-col justify-between">
        <div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Columns</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-between space-y-6 px-6">
            <p className="font-geist text-sm text-muted-foreground">
              This feature generates example columns with predefined names to
              help you visualize a structured board layout. Its an easy way to{" "}
              <span className="font-semibold text-primary">
                explore how columns can be used for organizing tasks.
              </span>
            </p>
          </CardContent>
        </div>

        <div className="px-6 pb-6">
          <Button
            variant="outline"
            className="h-[2.625rem] w-full rounded-md border-neutral-300/80 bg-[#FAFAFA] font-geist text-[0.9375rem] text-primary"
            disabled={isCreatingBoardExample}
            onClick={createBoardExample}
          >
            {isCreatingBoardExample ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              " Generate Columns"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}