import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

import { BoardData } from "../types";

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
        position, // Position indicates the task location within its column
        subtasks,
      } = variables.json;

      await queryClient.cancelQueries({ queryKey: ["board-data", boardId] });

      const previousData = queryClient.getQueryData<BoardData>([
        "board-data",
        boardId,
      ]);

      console.log(previousData);

      queryClient.setQueryData(["board-data", boardId], (oldBoardData) => {
        if (!oldBoardData) return null;

        const { statusColumn, tasks: oldTasks } = oldBoardData as BoardData;

        let newPosition = position;

        // Calculate a new position if the current position is null typically when the task status changes
        if (newPosition === null) {
          const highestPosition = Math.max(
            ...oldTasks.map((oldTask) => oldTask.position),
            0,
          );

          newPosition = highestPosition + 1000;
        }

        const updatedTasks = oldTasks.map((oldTask) => {
          if (oldTask.$id === targetTaskId) {
            return {
              ...oldTask,
              statusId,
              subtasks,
              position: newPosition,
            };
          } else return oldTask;
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
