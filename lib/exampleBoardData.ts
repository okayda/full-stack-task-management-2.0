import { TaskPriority } from "@/features/board/types";

export const boardNameExample = "Board Example";

export const tasksExample = [
  {
    taskName: "Design homepage layout",
    description: "Create wireframes & design mockups for the homepage.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 1000,
    subtasks: [
      { subtaskName: "Create wireframe", isCompleted: false },
      { subtaskName: "Design mockup", isCompleted: false },
    ],
  },
  {
    taskName: "Implement user authentication",
    description: "Set up authentication flow using Appwrite.",
    priority: TaskPriority.MEDIUM,
    statusId: "status200",
    position: 1000,
    subtasks: [
      { subtaskName: "Set up backend auth", isCompleted: true },
      { subtaskName: "Create login page", isCompleted: true },
      { subtaskName: "Create signup page", isCompleted: false },
    ],
  },
  {
    taskName: "Set up database schema",
    description: "Design & implement the database schema using PostgreSQL.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 2000,
    subtasks: [
      { subtaskName: "Define tables and relationships", isCompleted: false },
      { subtaskName: "Implement migrations", isCompleted: false },
    ],
  },
  {
    taskName: "Develop RESTful API endpoints",
    description: "Create API endpoints for user & product management.",
    priority: TaskPriority.MEDIUM,
    statusId: "status200",
    position: 2000,
    subtasks: [
      { subtaskName: "Create user endpoints", isCompleted: true },
      { subtaskName: "Create product endpoints", isCompleted: false },
      {
        subtaskName: "Implement authentication middleware",
        isCompleted: false,
      },
    ],
  },
  {
    taskName: "Integrate third-party payment gateway",
    description: "Add payment processing using Stripe.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 3000,
    subtasks: [
      { subtaskName: "Set up Stripe account", isCompleted: true },
      { subtaskName: "Implement payment API", isCompleted: false },
      { subtaskName: "Handle webhooks", isCompleted: false },
    ],
  },
  {
    taskName: "Optimize application performance",
    description: "Improve load times & optimize database queries.",
    priority: TaskPriority.LOW,
    statusId: "status300",
    position: 1000,
    subtasks: [
      { subtaskName: "Analyze slow queries", isCompleted: false },
      { subtaskName: "Implement caching", isCompleted: false },
      { subtaskName: "Optimize frontend assets", isCompleted: false },
    ],
  },
  {
    taskName: "Implement unit & integration tests",
    description: "Ensure code quality with automated testing.",
    priority: TaskPriority.MEDIUM,
    statusId: "status400",
    position: 1000,
    subtasks: [
      { subtaskName: "Write unit tests", isCompleted: true },
      { subtaskName: "Write integration tests", isCompleted: true },
      { subtaskName: "Set up CI pipeline", isCompleted: true },
    ],
  },
];

export const statusColumnExample = [
  { statusId: "status100", statusName: "Todo" },
  { statusId: "status200", statusName: "In Progress" },
  { statusId: "status300", statusName: "In Review" },
  { statusId: "status400", statusName: "Done" },
];
