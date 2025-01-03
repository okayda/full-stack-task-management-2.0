import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["create-board"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["create-board"]["$post"]
>;

export const useCreateBoard = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["create-board"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error("Failed to create board.");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully created your board.", {
        description: currentDate(),
      });
    },

    onError: (error) => {
      toast.error(error.message, {
        description: currentDate(),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["board-names"] });
    },
  });

  return mutation;
};
