import { CreateTaskForm } from "./create-task-form";

import { StatusColumnItem } from "../types";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
  statusColumn: StatusColumnItem[];
}

export const CreateTaskFormWrapper = ({
  onCancel,
  statusColumn,
}: CreateTaskFormWrapperProps) => {
  return <CreateTaskForm statusColumn={statusColumn} onCancel={onCancel} />;
};
