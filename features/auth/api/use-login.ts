import { useRouter } from "next/navigation";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });

      if (!response.ok) throw new Error("Failed mutation to verify account");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("Account verified successfully", {
        description: currentDate(),
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },

    onError: () => {
      toast.error("Failed to verify account");
    },
  });

  return mutation;
};
