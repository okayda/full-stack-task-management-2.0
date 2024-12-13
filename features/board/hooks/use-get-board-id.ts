import { useParams } from "next/navigation";

export const useGetBoardId = function () {
  const params = useParams();

  return params.boardId as string;
};
