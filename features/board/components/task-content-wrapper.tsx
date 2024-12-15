import TaskContent from "./task-content";

import { Task, StatusColumnItem } from "../types";

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
  return (
    <TaskContent
      task={task}
      statusColumn={statusColumn}
      closeTaskModal={closeTaskModal}
    />
  );
};
