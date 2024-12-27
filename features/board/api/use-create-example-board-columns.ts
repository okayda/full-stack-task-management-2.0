import { InferRequestType, InferResponseType } from "hono";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["create-example-board-columns"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["create-example-board-columns"]["$post"]
>;

export const useCreateExampleBoardColumns = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response =
        await client.api.board["create-example-board-columns"]["$post"]();

      if (!response.ok)
        throw new Error("Failed to initialize board columns example.");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully initialized board columns example.", {
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
      queryClient.invalidateQueries({ queryKey: ["board-data"] });
    },
  });

  return mutation;
};
