import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetBoardNames = function () {
  const query = useQuery({
    queryKey: ["board-names"],

    queryFn: async () => {
      const response = await client.api.board["get-board-names"]["$get"]();

      if (!response.ok) {
        throw new Error("Failed to retrieve board names.");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
