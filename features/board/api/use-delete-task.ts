import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["delete-task"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["delete-task"]["$delete"]
>;

export const useDeleteTask = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["delete-task"]["$delete"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }

      return await response.json();
    },

    onSuccess: (_, variables) => {
      const { boardId } = variables.json;

      toast.success("Successfully deleted your task.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },

    onError: () => {
      toast.error("Failed to delete your task.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
