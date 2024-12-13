import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["create-example-board-data"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["create-example-board-data"]["$post"]
>;

export const useCreateExampleBoardData = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response =
        await client.api.board["create-example-board-data"]["$post"]();

      if (!response.ok)
        throw new Error("Failed to initialize board data example.");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully initialized board data example.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["boards"] });
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
