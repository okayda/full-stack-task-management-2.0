import { TaskPriority } from "@/features/board/types";

export const dataExample = [
  // taskName: string; ✅
  // description?: string;
  // position: number; ✅
  // boardId: string;
  // subtasksId: string;
  // statusName: string; ✅
  // statusId: string; ✅
  // priority: TaskPriority; ✅
  {
    $id: "1",
    priority: TaskPriority.HIGH,
    taskName: "Design homepage layout",
    statusId: "status100",
    statusName: "Todo",
    position: 1,
  },
  {
    $id: "2",
    priority: TaskPriority.MEDIUM,
    taskName: "Implement user authentication",
    statusId: "status200",
    statusName: "In Progress",
    position: 1,
  },
  {
    $id: "3",
    priority: TaskPriority.LOW,
    taskName: "Set up database schema",
    statusId: "status100",
    statusName: "Todo",
    position: 2,
  },
  {
    $id: "4",
    priority: TaskPriority.HIGH,
    taskName: "Integrate third-party API",
    statusId: "status200",
    statusName: "In Progress",
    position: 2,
  },
  {
    $id: "5",
    priority: TaskPriority.MEDIUM,
    taskName: "Fix responsive layout issues",
    statusId: "status300",
    statusName: "In Review",
    position: 1,
  },
  {
    $id: "6",
    priority: TaskPriority.LOWEST,
    taskName: "Optimize images for performance",
    statusId: "status100",
    statusName: "Todo",
    position: 3,
  },
  {
    $id: "7",
    priority: TaskPriority.HIGHEST,
    taskName: "Write unit tests for components",
    statusId: "status200",
    statusName: "In Progress",
    position: 3,
  },
  {
    $id: "8",
    priority: TaskPriority.LOW,
    taskName: "Implement password reset functionality",
    statusId: "status300",
    statusName: "In Review",
    position: 2,
  },
  {
    $id: "9",
    priority: TaskPriority.HIGH,
    taskName: "Deploy application to production server",
    statusId: "status400",
    statusName: "Done",
    position: 1,
  },
  {
    $id: "10",
    priority: TaskPriority.MEDIUM,
    taskName: "Update documentation",
    statusId: "status400",
    statusName: "Done",
    position: 2,
  },
  {
    $id: "11",
    priority: TaskPriority.HIGHEST,
    taskName: "Refactor codebase for better maintainability",
    statusId: "status300",
    statusName: "In Review",
    position: 3,
  },
];

export const statusColumnExample = [
  { statusId: "status100", statusName: "Todo" },
  { statusId: "status200", statusName: "In Progress" },
  { statusId: "status300", statusName: "In Review" },
  { statusId: "status400", statusName: "Done" },
];
