import TaskContent from "./task-content";

import { Task, StatusColumnItem } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface TaskContentWrapperProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
  closeTaskModal: () => void;
}

export const TaskContentWrapper = function ({
  task,
  statusColumn,
  closeTaskModal,
}: TaskContentWrapperProps) {
  //   if (false) {
  //     return (
  //       <Card className="h-[714px] w-full border-none shadow-none">
  //         <CardContent className="flex h-full items-center justify-center">
  //           <Loader className="size-5 animate-spin text-muted-foreground" />
  //         </CardContent>
  //       </Card>
  //     );
  //   }

  return (
    <TaskContent
      task={task}
      statusColumn={statusColumn}
      closeTaskModal={closeTaskModal}
    />
  );
};
