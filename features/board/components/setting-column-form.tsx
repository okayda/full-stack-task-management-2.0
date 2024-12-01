"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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

import { BadgeXIcon } from "lucide-react";

interface SettingColumnFormProps {
  onCancel?: () => void;
}

export const SettingColumnForm = function ({
  onCancel,
}: SettingColumnFormProps) {
  const form = useForm({});
  const [columns, setColumns] = useState<string[]>(["", ""]);

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
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Setting Board</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="pb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Board Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Your board name?"
                        className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-b-2 border-dashed border-neutral-400/60 pb-4">
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
                      className="h-[40px] border-neutral-400/60"
                    />

                    <Button
                      type="button"
                      className="h-[40px] px-3"
                      onClick={() => removeColumn(index)}
                      disabled={columns.length === 2}
                    >
                      <BadgeXIcon className="!size-5" />
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
                    className="h-[40px] justify-center rounded-full border-neutral-400/60 px-10"
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

            <div className="mt-0 space-y-3 pt-1">
              <Button
                type="button"
                variant="destructive"
                disabled={false}
                className="h-[42px] w-full border-rose-900"
              >
                Delete Board
              </Button>

              <div className="flex gap-x-3">
                <Button
                  type="submit"
                  className="h-[42px] w-full tracking-wide"
                  disabled={false}
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={false}
                  onClick={onCancel}
                  className="h-[42px] w-full border"
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
