import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["delete-board"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["delete-board"]["$delete"]
>;

export const useDeleteBoard = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["delete-board"]["$delete"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to delete this board.");
      }

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully deleted. Please wait to be redirected.", {
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

      queryClient.invalidateQueries({ queryKey: ["board-names"] });
      queryClient.invalidateQueries({ queryKey: ["board-data", boardId] });
    },
  });

  return mutation;
};
