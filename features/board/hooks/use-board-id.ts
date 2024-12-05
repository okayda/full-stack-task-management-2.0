import { useParams } from "next/navigation";

export const useGetBoardId = () => {
  const params = useParams();

  return params.boardId as string;
};
