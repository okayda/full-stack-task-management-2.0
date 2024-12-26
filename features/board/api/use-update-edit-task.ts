import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

import { BoardData, Task } from "../types";

type ResponseType = InferResponseType<
  (typeof client.api.board)["update-edit-task"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["update-edit-task"]["$patch"]
>;

export const useUpdateEditTask = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType,
    { previousData?: BoardData }
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["update-edit-task"]["$patch"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to update your task.");

      return await response.json();
    },

    onMutate: async (variables) => {
      const {
        boardId,
        taskId: targetTaskId,
        taskName,
        description,
        priority,
        subtasks,
        statusId,
      } = variables.json;

      await queryClient.cancelQueries({ queryKey: ["board-data", boardId] });

      const previousData = queryClient.getQueryData<BoardData>([
        "tasks",
        boardId,
      ]);

      queryClient.setQueryData(["board-data", boardId], (oldBoardData) => {
        if (!oldBoardData) return null;

        const { statusColumn, tasks } = oldBoardData as BoardData;

        const updatedTasks = tasks.map((task: Task) => {
          if (task.$id === targetTaskId) {
            return {
              ...task,
              taskName,
              description,
              priority,
              subtasks,
              statusId,
            };
          }
          return task;
        });

        return { statusColumn, tasks: updatedTasks };
      });

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Successfully updated your task.", {
        description: currentDate(),
      });
    },

    onError: (error, variables, context) => {
      const { boardId } = variables.json;
      const contextData = context?.previousData;

      toast.error(error.message, {
        description: currentDate(),
      });

      if (contextData) {
        queryClient.setQueryData(["board-data", boardId], contextData);
      }
    },

    onSettled: (_data, _error, variables) => {
      const { boardId } = variables.json;

      queryClient.invalidateQueries({ queryKey: ["board-data", boardId] });
    },
  });

  return mutation;
};
