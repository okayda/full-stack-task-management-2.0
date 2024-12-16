import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["update-task-content"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["update-task-content"]["$patch"]
>;

export const useUpdateTaskContent = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["update-task-content"]["$patch"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to update task content.");

      return await response.json();
    },

    onSuccess: (data, variables) => {
      const { boardId } = variables.json;

      toast.success("Successfully updated your task content.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },

    onError: () => {
      toast.error("Failed to update your task content.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
