"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetBoardId } from "../hooks/use-get-board-id";

import { useCreateColumn } from "../api/use-create-column";

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

import { createColumnSchema } from "../schemas";

interface CreateColumnFormProps {
  closeCreateColumnModal: () => void;
}

type CreateColumnFormValue = z.infer<typeof createColumnSchema>;

export const CreateColumnForm = function ({
  closeCreateColumnModal,
}: CreateColumnFormProps) {
  const { mutate: createColumn, isPending: isCreatingColumn } =
    useCreateColumn();

  const boardId = useGetBoardId();

  const form = useForm({
    resolver: zodResolver(createColumnSchema),
    defaultValues: {
      boardId,
      statusName: "",
    },
  });

  const onSubmit = function (data: CreateColumnFormValue) {
    createColumn(
      { json: data },
      {
        onSuccess: function () {
          form.reset({
            statusName: "",
          });
          closeCreateColumnModal();
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Create Column</CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-4 sm:px-6">
              <FormField
                control={form.control}
                name="statusName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Column Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Your column name?"
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
                  disabled={isCreatingColumn}
                  onClick={() => {}}
                  className="h-[2.625rem] w-full tracking-wide"
                >
                  {isCreatingColumn ? "Creating..." : "Create"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isCreatingColumn}
                  onClick={closeCreateColumnModal}
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
