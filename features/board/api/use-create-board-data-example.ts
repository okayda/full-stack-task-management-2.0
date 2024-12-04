import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["create-board-data-example"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["create-board-data-example"]["$post"]
>;

export const useCreateBoardDataExample = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response =
        await client.api.board["create-board-data-example"]["$post"]();

      if (!response.ok)
        throw new Error("Failed to initialize board data example.");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully initialized board data example.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: () => {
      toast.error("Failed to initialize board data example.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
