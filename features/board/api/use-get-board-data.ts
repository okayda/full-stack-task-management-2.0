import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetBoardDataProps {
  boardId: string;
}

export const useGetBoardData = function ({ boardId }: UseGetBoardDataProps) {
  const query = useQuery({
    queryKey: ["board-data", boardId],

    queryFn: async () => {
      const response = await client.api.board["get-board-data"].$get({
        query: { boardId },
      });

      if (!response.ok) {
        throw new Error(
          "Failed to retrieve board data for this specific board.",
        );
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
