import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.board)["update-setting-column"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.board)["update-setting-column"]["$post"]
>;

export const useUpdateSettingColumn = function () {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.board["update-setting-column"]["$post"](
        {
          json,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update your setting columns.");
      }

      return await response.json();
    },

    onSuccess: (data, variables) => {
      const { boardId } = variables.json;
      toast.success("Successfully updated the columns.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },

    onError: () => {
      toast.error("Failed to update your setting columns.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
