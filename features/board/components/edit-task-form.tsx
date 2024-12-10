"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { customizeUpperCase } from "@/lib/utils";

import { TaskPriority, StatusColumn } from "../types";
import { editTaskSchema } from "../schemas";

import { MAX_SUB_TASKS } from "../constants";

import { BadgeXIcon } from "lucide-react";

interface EditTaskFormProps {
  onCancel?: () => void;
  statusColumn: StatusColumn[];
}

type EditTaskFormValues = z.infer<typeof editTaskSchema>;

export const EditTaskForm = function ({
  onCancel,
  statusColumn,
}: EditTaskFormProps) {
  const form = useForm<EditTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      boardId: "bsa100",
      taskName: "",
      subtasks: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const addSubtask = function () {
    if (fields.length < MAX_SUB_TASKS) {
      append({ value: "" });
    }
  };

  const removeSubtask = function (index: number) {
    remove(index);
  };

  const onSubmit: SubmitHandler<EditTaskFormValues> = function () {};

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Edit Task</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="tracking-wide">Task Name</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          placeholder="Your task name?"
                          className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="statusId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="tracking-wide">Status</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {statusColumn.map((statusColumn) => {
                            const columnName = customizeUpperCase(
                              statusColumn.statusName,
                            );

                            return (
                              <SelectItem
                                key={statusColumn.statusId}
                                value={statusColumn.statusId}
                              >
                                {columnName}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="tracking-wide">Priority</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value={TaskPriority.HIGHEST}>
                            Highest
                          </SelectItem>

                          <SelectItem value={TaskPriority.HIGH}>
                            High
                          </SelectItem>

                          <SelectItem value={TaskPriority.MEDIUM}>
                            Medium
                          </SelectItem>

                          <SelectItem value={TaskPriority.LOW}>Low</SelectItem>

                          <SelectItem value={TaskPriority.LOWEST}>
                            Lowest
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="tracking-wide">
                        Description
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          {...field}
                          autoComplete="off"
                          placeholder="Do you have any description?"
                          className="!mt-1 h-[80px] border-neutral-400/60 text-[15px] md:h-[80px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <Accordion type="single" collapsible className="!mt-2">
              <AccordionItem
                value="subtasks"
                className="border-b-2 border-dashed border-neutral-400/50"
              >
                <AccordionTrigger className="pb-4 text-sm !no-underline">
                  Optional minor tasks
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-2 py-1">
                    {fields.map((field, index) => {
                      return (
                        <div key={field.id} className="flex items-center gap-2">
                          <Input
                            {...form.register(`subtasks.${index}.value`)}
                            autoComplete="off"
                            placeholder="Your minor task?"
                            className="h-[40px] border-neutral-400/60"
                          />

                          <Button
                            type="button"
                            disabled={false}
                            className="h-[40px] px-3"
                            onClick={() => removeSubtask(index)}
                          >
                            <BadgeXIcon className="!size-5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {fields.length < MAX_SUB_TASKS && (
                    <Button
                      type="button"
                      disabled={false}
                      variant="outline"
                      className="mt-2 h-[40px] w-full border-neutral-400/60"
                      onClick={addSubtask}
                    >
                      New Subtask
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 flex gap-x-2">
              <Button
                type="submit"
                disabled={false}
                className="h-[42px] w-full tracking-wide"
              >
                {false ? "Loading..." : "Create"}
              </Button>

              <Button
                type="button"
                disabled={false}
                variant="secondary"
                onClick={onCancel}
                className="h-[42px] w-full border tracking-wide"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
