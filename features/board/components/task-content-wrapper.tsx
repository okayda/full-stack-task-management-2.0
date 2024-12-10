import TaskContent from "./task-content";

import { StatusColumn } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface TaskContentWrapperProps {
  onCancel: () => void;
  statusColumn: StatusColumn[];
}

export const TaskContentWrapper = function ({
  onCancel,
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

  return <TaskContent statusColumn={statusColumn} onCancel={onCancel} />;
};
