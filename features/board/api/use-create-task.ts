import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["create-task"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["create-task"]["$post"]
>;

export const useCreateTask = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["create-task"]["$post"]({ json });

      if (!response.ok) throw new Error("Failed to create task.");

      return await response.json();
    },

    onSuccess: (_, variables) => {
      const { boardId } = variables.json;

      toast.success("Successfully created your task.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["board-data", boardId] });
    },

    onError: () => {
      toast.error("Failed to create your task.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
