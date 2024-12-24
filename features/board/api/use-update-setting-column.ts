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

    onSuccess: (data, variables) => {
      const { boardId } = variables.json;
      toast.success("Successfully updated your board.", {
        description: currentDate(),
      });

      queryClient.invalidateQueries({ queryKey: ["board-names"] });
      queryClient.invalidateQueries({ queryKey: ["board-data", boardId] });
    },

    onError: () => {
      toast.error("Failed to update your board.", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
