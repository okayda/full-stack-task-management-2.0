import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.create)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.create)["$post"]>;

export const useCreate = function () {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async function ({ json }) {
      const response = await client.api.auth.create["$post"]({ json });

      if (!response.ok) throw new Error("Failed to create account");

      return await response.json();
    },

    onSuccess: function () {
      toast.success("Account created successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },

    onError: function () {
      toast.error("Failed to create account");
    },
  });

  return mutation;
};
