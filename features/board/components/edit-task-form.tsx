"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetBoardId } from "../hooks/use-get-board-id";

import { useUpdateEditTask } from "../api/use-update-edit-task";

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

import { MAX_SUB_TASKS } from "../constants";

import { taskSchema } from "../schemas";

import { StatusColumn, Task, SubTask, TaskPriority } from "../types";

import { CircleXIcon } from "lucide-react";

interface EditTaskFormProps {
  task: Task;
  statusColumn: StatusColumn;

  closeEditTaskModal: () => void;
  closeTaskContentModal: () => void;
}

type EditTaskFormValues = z.infer<typeof taskSchema>;

export const EditTaskForm = function ({
  task,
  statusColumn,
  closeEditTaskModal,
  closeTaskContentModal,
}: EditTaskFormProps) {
  const boardId = useGetBoardId();
  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateEditTask();

  const form = useForm<EditTaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      boardId,
      taskName: task.taskName,
      statusId: task.statusId,
      description: task.description || "",
      priority: task.priority,
      subtasks: task.subtasks.length
        ? task.subtasks.map((subtask: SubTask) => ({
            subtaskName: subtask.subtaskName,
            isCompleted: subtask.isCompleted,
          }))
        : [{ subtaskName: "", isCompleted: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const addSubtask = function () {
    if (fields.length < MAX_SUB_TASKS) {
      append({ subtaskName: "", isCompleted: false });
    }
  };

  const removeSubtask = function (index: number) {
    remove(index);

    if (fields.length - 1 === 0) {
      append({ subtaskName: "", isCompleted: false });
    }
  };

  const onSubmit: SubmitHandler<EditTaskFormValues> = (formValues) => {
    const taskId = task.$id;
    const subtasksId = task.subtasksId;

    const validSubtasks = formValues.subtasks.filter(({ subtaskName }) => {
      if (subtaskName?.trim()) return subtaskName;
    });

    const editedTask = {
      ...formValues,
      taskId,
      subtasksId,
      subtasks: validSubtasks,
    };

    updateTask({ json: editedTask });
    closeEditTaskModal();
    closeTaskContentModal();
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-2xl font-medium">Edit Task</CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6 px-4 sm:px-6">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="taskName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="tracking-wide">
                          Task Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Your task name?"
                            className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]"
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
                        <FormLabel className="tracking-wide">
                          Current status
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]">
                              <SelectValue placeholder={task.statusId} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusColumn.columns.map((statusColumn) => {
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

                <div className="pb-1">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="tracking-wide">
                            Priority
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem] md:h-[2.625rem]">
                                <SelectValue
                                  placeholder={field.value || "Select priority"}
                                />
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
                              <SelectItem value={TaskPriority.LOW}>
                                Low
                              </SelectItem>
                              <SelectItem value={TaskPriority.LOWEST}>
                                Lowest
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      );
                    }}
                  />
                </div>

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
                            className="!mt-1 h-[5rem] border-neutral-400/60 text-[0.9375rem]"
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
                  className="border-b border-dashed border-neutral-400/70"
                >
                  <AccordionTrigger className="pb-4 text-sm !no-underline">
                    <div className="flex items-center gap-x-2">
                      Your subtasks
                      <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-100 text-xs font-medium">
                        {fields.length}
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="space-y-2 py-1">
                      {fields.map((field, index) => {
                        return (
                          <div
                            key={field.id}
                            className="flex items-center gap-2"
                          >
                            <Input
                              {...form.register(
                                `subtasks.${index}.subtaskName`,
                              )}
                              autoComplete="off"
                              placeholder="Your minor task?"
                              className="h-[2.5rem] border-neutral-400/60"
                            />

                            <Button
                              type="button"
                              variant="secondary"
                              disabled={
                                (fields.length === 1 &&
                                  !fields[0].subtaskName) ||
                                isUpdatingTask
                              }
                              className="h-[2.5rem] border border-neutral-300/80 px-3 text-neutral-700"
                              onClick={() => removeSubtask(index)}
                            >
                              <CircleXIcon className="!size-5" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    {fields.length < MAX_SUB_TASKS && (
                      <Button
                        type="button"
                        disabled={isUpdatingTask}
                        variant="outline"
                        className="mt-2 h-[2.5rem] w-full border-neutral-400/60"
                        onClick={addSubtask}
                      >
                        New Subtask
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="border-t bg-[#FAFAFA] px-4 py-4 sm:px-6">
              <div className="flex gap-x-2">
                <Button
                  type="submit"
                  disabled={isUpdatingTask}
                  className="h-[2.625rem] w-full tracking-wide"
                >
                  {isUpdatingTask ? "Updating..." : "Update"}
                </Button>

                <Button
                  type="button"
                  disabled={isUpdatingTask}
                  variant="outline"
                  onClick={closeEditTaskModal}
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
