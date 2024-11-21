"use client";

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

interface CreateBoardFormProps {
  onCancel?: () => void;
}

export const CreateBoardForm = function ({ onCancel }: CreateBoardFormProps) {
  const form = useForm({});

  const onSubmit = function () {};

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">Create Board</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
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
                        placeholder="Your board name"
                        className="!mt-1 h-[45px] border-neutral-400/60 text-[15px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-x-2">
              <Button
                type="submit"
                disabled={false}
                onClick={() => {}}
                className="h-[42px] w-full tracking-wide"
              >
                Create Board
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