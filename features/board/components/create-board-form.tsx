"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateBoard } from "../api/use-create-board";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { createBoardSchema } from "../schemas";

interface CreateBoardFormProps {
  closeCreateBoardModal: () => void;
}

type CreateBoardFormValue = z.infer<typeof createBoardSchema>;

export const CreateBoardForm = function ({
  closeCreateBoardModal,
}: CreateBoardFormProps) {
  const { mutate: createBoard, isPending: isCreatingBoard } = useCreateBoard();

  const form = useForm({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      boardName: "",
    },
  });

  const onSubmit = function (data: CreateBoardFormValue) {
    createBoard(
      { json: data },
      {
        onSuccess: function () {
          form.reset({
            boardName: "",
          });
          closeCreateBoardModal();
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Create Board</CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-4 sm:px-6">
              <FormField
                control={form.control}
                name="boardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Board Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Your board name?"
                        className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t bg-[#FAFAFA] px-4 py-4 sm:px-6">
              <div className="flex gap-x-2">
                <Button
                  type="submit"
                  disabled={isCreatingBoard}
                  className="h-[2.625rem] w-full tracking-wide"
                >
                  {isCreatingBoard ? "Creating..." : "Create"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isCreatingBoard}
                  onClick={closeCreateBoardModal}
                  className="h-[2.625rem] w-full border tracking-wide"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
