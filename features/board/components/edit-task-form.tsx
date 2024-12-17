"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetBoardId } from "../hooks/use-get-board-id";

import { useUpdateTask } from "../api/use-update-task";

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

import { Task, StatusColumnItem, SubTask, TaskPriority } from "../types";

import { CircleXIcon } from "lucide-react";

interface EditTaskFormProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
  closeEditModal: () => void;
  closeTaskModal: () => void | undefined;
}

type EditTaskFormValues = z.infer<typeof taskSchema>;

export const EditTaskForm = function ({
  task,
  statusColumn,
  closeEditModal,
  closeTaskModal,
}: EditTaskFormProps) {
  const boardId = useGetBoardId();

  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateTask();

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
    closeEditModal();
    closeTaskModal();
  };

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
                className="border-b-2 border-dashed border-neutral-400/50"
              >
                <AccordionTrigger className="pb-4 text-sm !no-underline">
                  <div className="flex items-center gap-x-2">
                    Your subtasks
                    <div className="text-neutal-700 flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium">
                      {fields.length}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-2 py-1">
                    {fields.map((field, index) => {
                      return (
                        <div key={field.id} className="flex items-center gap-2">
                          <Input
                            {...form.register(`subtasks.${index}.subtaskName`)}
                            autoComplete="off"
                            placeholder="Your minor task?"
                            className="h-[2.5rem] border-neutral-400/60"
                          />

                          <Button
                            type="button"
                            disabled={
                              (fields.length === 1 && !fields[0].subtaskName) ||
                              isUpdatingTask
                            }
                            className="h-[2.5rem] px-3"
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

            <div className="mt-6 flex gap-x-2">
              <Button
                type="submit"
                disabled={isUpdatingTask}
                className="h-[2.625rem] w-full tracking-wide"
              >
                {isUpdatingTask ? "Loading..." : "Update"}
              </Button>

              <Button
                type="button"
                disabled={isUpdatingTask}
                variant="secondary"
                onClick={closeEditModal}
                className="h-[2.625rem] w-full border tracking-wide"
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
