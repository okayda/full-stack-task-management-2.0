import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetTasksProps {
  boardId: string;
}

export const useGetTasks = function ({ boardId }: UseGetTasksProps) {
  const query = useQuery({
    queryKey: ["tasks", boardId],

    queryFn: async () => {
      const response = await client.api.board["get-tasks"].$get({
        query: { boardId },
      });

      if (!response.ok) {
        throw new Error("Failed to get tasks to this specific board");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
