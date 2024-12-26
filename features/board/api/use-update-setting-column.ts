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
        throw new Error("Failed to update your board.");
      }

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Successfully updated your board.", {
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
