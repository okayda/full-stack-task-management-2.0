import { EditTaskForm } from "./edit-task-form";

import { StatusColumn } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  statusColumn: StatusColumn[];
}

export const EditTaskFormWrapper = function ({
  onCancel,
  statusColumn,
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

  return <EditTaskForm statusColumn={statusColumn} onCancel={onCancel} />;
};
