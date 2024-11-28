"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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

import { TaskStatus, TaskPriority } from "../types";

import { BadgeXIcon } from "lucide-react";

interface CreateTaskFormProps {
  onCancel?: () => void;
}

export const CreateTaskForm = function ({ onCancel }: CreateTaskFormProps) {
  const form = useForm({});
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  const addSubtask = function () {
    if (subtasks.length < 5) {
      setSubtasks([...subtasks, ""]);
    }
  };

  const removeSubtask = function (index: number) {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  const updateSubtask = function (index: number, value: string) {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? value : subtask,
    );
    setSubtasks(updatedSubtasks);
  };

  const onSubmit = function () {};

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">New Task</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
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

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Status</FormLabel>

                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>

                      <FormMessage />

                      <SelectContent>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          In Progress
                        </SelectItem>

                        <SelectItem value={TaskStatus.IN_REVIEW}>
                          In Review
                        </SelectItem>

                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>

                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Description</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Do you have any description?"
                        className="!mt-1 h-[80px] border-neutral-400/60 text-[15px] md:h-[80px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wide">Priority</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="!mt-1 h-[45px] border-neutral-400/60 text-[15px] md:h-[42px]">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>

                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={TaskPriority.HIGHEST}>
                          Highest
                        </SelectItem>
                        <SelectItem value={TaskPriority.HIGH}>High</SelectItem>

                        <SelectItem value={TaskPriority.MEDIUM}>
                          Medium
                        </SelectItem>

                        <SelectItem value={TaskPriority.LOW}>Low</SelectItem>

                        <SelectItem value={TaskPriority.LOWEST}>
                          Lowest
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
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
                    {subtasks.map((subtask, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={subtask}
                          onChange={(e) => updateSubtask(index, e.target.value)}
                          placeholder="Your minor task?"
                          className="h-[40px] border-neutral-400/60"
                        />

                        <Button
                          type="button"
                          className="h-[40px] px-3"
                          onClick={() => removeSubtask(index)}
                          disabled={subtasks.length === 1}
                        >
                          <BadgeXIcon className="!size-5" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {subtasks.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 h-[40px] w-full border-neutral-400/60"
                      disabled={false}
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
                Create
              </Button>

              <Button
                type="button"
                variant="secondary"
                disabled={false}
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
