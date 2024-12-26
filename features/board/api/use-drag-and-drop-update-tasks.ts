import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

import { BoardData } from "../types";

type ResponseType = InferResponseType<
  (typeof client.api.board)["drag-and-drop-update-tasks"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["drag-and-drop-update-tasks"]["$post"]
>;

export const useDragAndDropUpdateTasks = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["drag-and-drop-update-tasks"][
        "$post"
      ]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update board via drag-and-drop.");
      }

      return await response.json();
    },

    onMutate: async (variables) => {
      const { boardId, tasks: updateddTasks } = variables.json;
      if (updateddTasks.length === 0) return;

      await queryClient.cancelQueries({ queryKey: ["board-data", boardId] });

      const previousData = queryClient.getQueryData<BoardData>([
        "board-data",
        boardId,
      ]);

      queryClient.setQueryData<BoardData>(
        ["board-data", boardId],
        (oldBoarData) => {
          if (!oldBoarData) return oldBoarData;

          const newBoardData = { ...oldBoarData };

          newBoardData.tasks = oldBoarData.tasks.map((task) => {
            const updated = updateddTasks.find(
              (updatedTask) => updatedTask.$id === task.$id,
            );

            if (updated) {
              return { ...task, ...updated };
            }

            return task;
          });

          return newBoardData;
        },
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Successfully updated.", {
        description: currentDate(),
      });
    },

    onError: (error) => {
      toast.error(error.message, {
        description: currentDate(),
      });
    },

    onSettled: (_data, _error, variables) => {
      const { boardId } = variables.json;

      queryClient.invalidateQueries({ queryKey: ["board-data", boardId] });
    },
  });

  return mutation;
};
