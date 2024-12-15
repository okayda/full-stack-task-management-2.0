import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["update-subtasks"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["update-subtasks"]["$patch"]
>;

export const useUpdateSubtasks = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["update-subtasks"]["$patch"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to update subtasks.");

      return await response.json();
    },

    onSuccess: (data, variables) => {
      const { boardId } = variables.json;

      toast.success("Successfully updated your subtasks.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },

    onError: () => {
      toast.error("Failed to update your subtasks.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
