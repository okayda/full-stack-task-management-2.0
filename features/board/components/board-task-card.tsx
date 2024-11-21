import { Task } from "../types";

interface BoardTaskProps {
  task: Task;
}

export default function BoardTaskCard({ task }: BoardTaskProps) {
  return (
    <div className="cursor-grab rounded-lg border border-transparent bg-white px-4 py-6 shadow-task transition hover:border-[#0F0F0F] hover:shadow-none">
      <h3 className="mb-2 pb-2.5 text-[15px] font-medium">{task.name}</h3>

      <p className="text-xs font-medium text-muted-foreground">
        0 of 5 subtasks
      </p>
    </div>
  );
}
