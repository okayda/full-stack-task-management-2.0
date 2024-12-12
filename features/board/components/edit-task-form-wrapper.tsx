import { EditTaskForm } from "./edit-task-form";

import { Task, StatusColumnItem } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface EditTaskFormWrapperProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
  closeEditModal: () => void;
}

export const EditTaskFormWrapper = function ({
  task,
  statusColumn,
  closeEditModal,
}: EditTaskFormWrapperProps) {
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
    <EditTaskForm
      task={task}
      statusColumn={statusColumn}
      closeEditModal={closeEditModal}
    />
  );
};
