"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Models } from "node-appwrite";

import { useGetBoardId } from "../hooks/use-get-board-id";

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

import { StatusColumnItem } from "../types";

import { CircleXIcon, MoreVertical } from "lucide-react";

interface SettingColumnFormProps {
  userBoardsData: Models.DocumentList<Models.Document>;
  statusColumn: StatusColumnItem[];
  closeSettingColumnForm: () => void;
}

export const SettingColumnForm = function ({
  userBoardsData,
  statusColumn,
  closeSettingColumnForm,
}: SettingColumnFormProps) {
  const form = useForm({});
  const [columns, setColumns] = useState<string[]>(["", ""]);

  const boardId = useGetBoardId();
  const board = userBoardsData.documents.find((board) => board.$id === boardId);

  const addColumn = function () {
    if (columns.length < MAX_COLUMNS) {
      setColumns([...columns, ""]);
    }
  };

  const removeColumn = function (index: number) {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
  };

  const updateColumn = function (index: number, value: string) {
    const updatedColumns = columns.map((column, i) =>
      i === index ? value : column,
    );
    setColumns(updatedColumns);
  };

  const onSubmit = function () {};

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-3 space-y-0 pb-5 sm:pt-10">
        <CardTitle className="text-2xl font-medium">Setting Board</CardTitle>

        <SettingColumnActions>
          <MoreVertical className="!size-5" />
        </SettingColumnActions>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-6">
              <div className="mb-[1.125rem]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wide">
                        Board Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
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

                <div className="mb-4 space-y-2">
                  {columns.map((column, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={column}
                        onChange={(e) => updateColumn(index, e.target.value)}
                        placeholder="Your column name?"
                        className="h-[2.8125rem] border-neutral-400/60 md:h-[2.625rem]"
                      />

                      <Button
                        type="button"
                        className="h-[2.8125rem] px-3 md:h-[2.625rem]"
                        onClick={() => removeColumn(index)}
                        disabled={columns.length === 2}
                      >
                        <CircleXIcon className="!size-5" />
                      </Button>
                    </div>
                  ))}
                </div>

                {columns.length < MAX_COLUMNS && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={false}
                      className="h-[2.8125rem] justify-center rounded-full border-neutral-400/60 px-10 md:h-[2.625rem]"
                      onClick={addColumn}
                    >
                      New Column
                    </Button>
                  </div>
                )}

                {columns.length === 5 && (
                  <p className="text-center text-sm text-gray-500">
                    Only 5 columns allowed
                  </p>
                )}
              </div>
            </div>

            <div className="border-t bg-[#FAFAFA] px-4 py-4 sm:px-6">
              <div className="flex gap-x-2">
                <Button
                  type="submit"
                  className="h-[2.625rem] w-full tracking-wide"
                  disabled={false}
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={false}
                  onClick={closeSettingColumnForm}
                  className="h-[2.625rem] w-full border"
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
