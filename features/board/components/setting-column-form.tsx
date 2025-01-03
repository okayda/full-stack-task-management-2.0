"use client";

import { Models } from "node-appwrite";

import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetBoardId } from "../hooks/use-get-board-id";

import { useUpdateSettingColumn } from "../api/use-update-setting-column";
import { useDeleteBoard } from "../api/use-delete-board";

import { SettingColumnActions } from "./setting-column-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { MAX_COLUMNS } from "../constants";

import { StatusColumn, StatusColumnItem } from "../types";

import { settingColumnSchema } from "../schemas";

import { CircleXIcon, MoreVertical } from "lucide-react";

interface SettingColumnFormProps {
  userBoardNames: Models.Document[];
  statusColumn?: StatusColumn;

  closeSettingColumnModal: () => void;
}

type SettingColumnFormValues = z.infer<typeof settingColumnSchema>;

export const SettingColumnForm = function ({
  userBoardNames,
  statusColumn,
  closeSettingColumnModal,
}: SettingColumnFormProps) {
  const boardId = useGetBoardId();
  const board = userBoardNames.find(
    (board: Models.Document) => board.$id === boardId,
  );

  const { mutate: updateSettingColumn, isPending: isUpdatingSettingColumn } =
    useUpdateSettingColumn();
  const { mutate: deleteBoard, isPending: isDeletingBoard } = useDeleteBoard();

  const originalFormValues = {
    boardId,
    boardName: board?.boardName,
    statusColumn: statusColumn?.columns.map(
      (statusColumnItem: StatusColumnItem) => ({
        statusId: statusColumnItem.statusId,
        statusName: statusColumnItem.statusName,
      }),
    ),
  };

  const form = useForm<SettingColumnFormValues>({
    resolver: zodResolver(settingColumnSchema),
    defaultValues: {
      ...originalFormValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "statusColumn",
  });

  const addColumn = function () {
    if (fields.length < MAX_COLUMNS) {
      append({ statusName: "", statusId: "" });
    }
  };

  const removeColumn = function (index: number) {
    remove(index);
  };

  const onSubmit: SubmitHandler<SettingColumnFormValues> = (formValues) => {
    updateSettingColumn(
      { json: formValues },
      {
        onSuccess: function () {
          closeSettingColumnModal();
        },
      },
    );
  };

  const deleteBoardHandler = function () {
    deleteBoard(
      { json: { boardId } },
      {
        onSuccess: function () {
          closeSettingColumnModal();
        },
      },
    );
  };

  // Validating whether there are any changes to the previous settings data this determines if the save button should be clickable
  const currentFormValues = useWatch({ control: form.control });
  const hasFormChanged =
    JSON.stringify(originalFormValues) !== JSON.stringify(currentFormValues);

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 px-4 pb-5 sm:px-6">
        <CardTitle className="text-2xl font-medium">Board Setting</CardTitle>

        <SettingColumnActions deleteBoardHandler={deleteBoardHandler}>
          <MoreVertical className="!size-6" />
        </SettingColumnActions>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-6">
              <div className="mb-[1.125rem]">
                <FormField
                  control={form.control}
                  name="boardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wide">
                        Board Name
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingSettingColumn || isDeletingBoard}
                          autoComplete="off"
                          placeholder="Your board name?"
                          className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-6 border-b border-dashed border-neutral-400/70 pb-4">
                <FormLabel className="mb-2 block tracking-wide">
                  Columns available
                </FormLabel>

                {form.formState.errors.statusColumn && (
                  <p className="mb-2 text-sm text-rose-600">
                    {form.formState.errors.statusColumn.message}
                  </p>
                )}

                <div className="mb-4 space-y-2">
                  {fields.map((field, index) => {
                    return (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          {...form.register(`statusColumn.${index}.statusName`)}
                          autoComplete="off"
                          placeholder="Column Name"
                          className="h-[2.8125rem] border-neutral-400/60 md:h-[2.625rem]"
                          disabled={isUpdatingSettingColumn || isDeletingBoard}
                        />

                        <Button
                          type="button"
                          variant="secondary"
                          className="h-[2.8125rem] border border-neutral-300/80 px-3 text-neutral-700 md:h-[2.625rem]"
                          onClick={() => removeColumn(index)}
                          disabled={
                            fields.length === 2 ||
                            isUpdatingSettingColumn ||
                            isDeletingBoard
                          }
                        >
                          <CircleXIcon className="!size-5" />
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {fields.length < MAX_COLUMNS && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-[2.8125rem] justify-center rounded-full border-neutral-400/60 px-10 md:h-[2.625rem]"
                      onClick={addColumn}
                      disabled={isUpdatingSettingColumn || isDeletingBoard}
                    >
                      New Column
                    </Button>
                  </div>
                )}

                {fields.length === MAX_COLUMNS && (
                  <p className="text-center text-sm text-gray-500">
                    Only {MAX_COLUMNS} columns allowed
                  </p>
                )}
              </div>
            </div>

            <div className="border-t bg-[#FAFAFA] px-4 py-4 sm:px-6">
              <div className="flex gap-x-2">
                <Button
                  type="submit"
                  className="h-[2.625rem] w-full tracking-wide"
                  disabled={
                    isUpdatingSettingColumn ||
                    !hasFormChanged ||
                    isDeletingBoard
                  }
                >
                  {isUpdatingSettingColumn
                    ? "Updating..."
                    : isDeletingBoard
                      ? "Deleting..."
                      : "Save"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={closeSettingColumnModal}
                  className="h-[2.625rem] w-full border"
                  disabled={isUpdatingSettingColumn || isDeletingBoard}
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
