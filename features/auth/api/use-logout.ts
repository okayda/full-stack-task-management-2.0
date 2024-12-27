import { useRouter } from "next/navigation";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { currentDate } from "@/lib/utils";

import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();

      if (!response.ok) throw new Error("Failed to logout");

      return await response.json();
    },

    onSuccess: () => {
      toast.success("You have successfully logged out.", {
        description: currentDate(),
      });

      queryClient.clear();
      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message, {
        description: currentDate(),
      });
    },
  });

  return mutation;
};
