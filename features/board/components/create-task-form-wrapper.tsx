import { CreateTaskForm } from "./create-task-form";

import { StatusColumnItem } from "../types";

// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
  statusColumn: StatusColumnItem[];
}

export const CreateTaskFormWrapper = ({
  onCancel,
  statusColumn,
}: CreateTaskFormWrapperProps) => {
  //   if (false) {
  //     return (
  //       <Card className="h-[714px] w-full border-none shadow-none">
  //         <CardContent className="flex h-full items-center justify-center">
  //           <Loader className="size-5 animate-spin text-muted-foreground" />
  //         </CardContent>
  //       </Card>
  //     );
  //   }

  return <CreateTaskForm statusColumn={statusColumn} onCancel={onCancel} />;
};
