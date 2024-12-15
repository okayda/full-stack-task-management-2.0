import { EditTaskForm } from "./edit-task-form";

import { Task, StatusColumnItem } from "../types";

interface EditTaskFormWrapperProps {
  task: Task;
  statusColumn: {
    columns: StatusColumnItem[];
    boardId: string;
  };
  closeEditModal: () => void;
  closeTaskModal: () => void;
}

export const EditTaskFormWrapper = function ({
  task,
  statusColumn,
  closeEditModal,
  closeTaskModal,
}: EditTaskFormWrapperProps) {
  return (
    <EditTaskForm
      task={task}
      statusColumn={statusColumn}
      closeEditModal={closeEditModal}
      closeTaskModal={closeTaskModal}
    />
  );
};
