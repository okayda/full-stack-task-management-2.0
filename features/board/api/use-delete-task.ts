import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

import { BoardData, Task } from "../types";

type ResponseType = InferResponseType<
  (typeof client.api.board)["delete-task"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["delete-task"]["$delete"]
>;

export const useDeleteTask = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType,
    { previousData?: BoardData }
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["delete-task"]["$delete"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to delete your task.");
      }

      return await response.json();
    },

    onMutate: async (variables) => {
      const { boardId, taskId: targetTaskId } = variables.json;

      await queryClient.cancelQueries({ queryKey: ["board-data", boardId] });

      const previousData = queryClient.getQueryData<BoardData>([
        "board-data",
        boardId,
      ]);

      queryClient.setQueryData(["board-data", boardId], (oldBoardData) => {
        if (!oldBoardData) return null;

        const { statusColumn, tasks } = oldBoardData as BoardData;

        const updatedTasks = tasks.filter(
          (task: Task) => task.$id !== targetTaskId,
        );

        return { statusColumn, tasks: updatedTasks };
      });

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Successfully deleted your task.", {
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
  });

  return mutation;
};
