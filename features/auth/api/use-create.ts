import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.create)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.create)["$post"]>;

export const useCreate = function () {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async function ({ json }) {
      const response = await client.api.auth.create["$post"]({ json });

      if (!response.ok) {
        const errorData = (await response.json()) as {
          message?: string;
        };

        throw new Error(errorData.message);
      }

      return await response.json();
    },

    onSuccess: function () {
      toast.success("Account created successfully.", {
        description: currentDate(),
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["user-account"] });
    },

    onError: function () {
      toast.warning("Failed to create account", {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
