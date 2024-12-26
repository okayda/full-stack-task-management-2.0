import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

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
