import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetBoards = function () {
  const query = useQuery({
    queryKey: ["boards"],

    queryFn: async () => {
      const response = await client.api.board["get-boards"]["$get"]();

      if (!response.ok) {
        throw new Error("Failed to get boards to this specific board");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
