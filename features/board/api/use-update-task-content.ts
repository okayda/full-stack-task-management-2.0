import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

import { BoardData, Task } from "../types";

type ResponseType = InferResponseType<
  (typeof client.api.board)["update-task-content"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["update-task-content"]["$patch"]
>;

export const useUpdateTaskContent = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType,
    { previousData?: BoardData }
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["update-task-content"]["$patch"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update your task content.");
      }

      return await response.json();
    },

    onMutate: async (variables) => {
      const {
        boardId,
        taskId: targetTaskId,
        statusId,
        subtasks,
      } = variables.json;

      await queryClient.cancelQueries({ queryKey: ["tasks", boardId] });

      const previousData = queryClient.getQueryData<BoardData>([
        "tasks",
        boardId,
      ]);

      queryClient.setQueryData(["tasks", boardId], (oldBoardData) => {
        if (!oldBoardData) return null;

        const { statusColumn, tasks } = oldBoardData as BoardData;

        const updatedTasks = tasks.map((task: Task) => {
          if (task.$id === targetTaskId) {
            return { ...task, statusId, subtasks };
          } else return task;
        });

        return { statusColumn, tasks: updatedTasks };
      });

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Successfully updated your task content.", {
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
        queryClient.setQueryData(["tasks", boardId], contextData);
      }
    },

    onSettled: (_data, _error, variables) => {
      const { boardId } = variables.json;
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },
  });

  return mutation;
};
