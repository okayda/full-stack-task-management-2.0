import TaskContent from "./task-content";

import { Task, StatusColumnItem } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface TaskContentWrapperProps {
  onCancel: () => void;
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
}

export const TaskContentWrapper = function ({
  onCancel,
  task,
  statusColumn,
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
    <TaskContent task={task} statusColumn={statusColumn} onCancel={onCancel} />
  );
};
