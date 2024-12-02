import { TaskPriority } from "@/features/board/types";

export const tasksExample = [
  {
    taskName: "Design homepage layout",
    description: "Create wireframes and design mockups for the homepage.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 1000,
    subtasks: [
      { title: "Create wireframe", isCompleted: false },
      { title: "Design mockup", isCompleted: false },
    ],
  },
  {
    taskName: "Implement user authentication",
    description: "Set up authentication flow using Appwrite.",
    priority: TaskPriority.MEDIUM,
    statusId: "status200",
    position: 1000,
    subtasks: [
      { title: "Set up backend auth", isCompleted: false },
      { title: "Create login page", isCompleted: false },
      { title: "Create signup page", isCompleted: false },
    ],
  },
  {
    taskName: "Set up database schema",
    description: "Design and implement the database schema using PostgreSQL.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 2000,
    subtasks: [
      { title: "Define tables and relationships", isCompleted: false },
      { title: "Implement migrations", isCompleted: false },
    ],
  },
  {
    taskName: "Develop RESTful API endpoints",
    description: "Create API endpoints for user and product management.",
    priority: TaskPriority.MEDIUM,
    statusId: "status200",
    position: 2000,
    subtasks: [
      { title: "Create user endpoints", isCompleted: false },
      { title: "Create product endpoints", isCompleted: false },
      { title: "Implement authentication middleware", isCompleted: false },
    ],
  },
  {
    taskName: "Integrate third-party payment gateway",
    description: "Add payment processing using Stripe.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 3000,
    subtasks: [
      { title: "Set up Stripe account", isCompleted: false },
      { title: "Implement payment API", isCompleted: false },
      { title: "Handle webhooks", isCompleted: false },
    ],
  },
  {
    taskName: "Optimize application performance",
    description: "Improve load times and optimize database queries.",
    priority: TaskPriority.LOW,
    statusId: "status300",
    position: 1000,
    subtasks: [
      { title: "Analyze slow queries", isCompleted: false },
      { title: "Implement caching", isCompleted: false },
      { title: "Optimize frontend assets", isCompleted: false },
    ],
  },
  {
    taskName: "Implement unit and integration tests",
    description: "Ensure code quality with automated testing.",
    priority: TaskPriority.MEDIUM,
    statusId: "status400",
    position: 1000,
    subtasks: [
      { title: "Write unit tests", isCompleted: false },
      { title: "Write integration tests", isCompleted: false },
      { title: "Set up CI pipeline", isCompleted: false },
    ],
  },
];

export const statusColumnExample = [
  { statusId: "status100", statusName: "Todo" },
  { statusId: "status200", statusName: "In Progress" },
  { statusId: "status300", statusName: "In Review" },
  { statusId: "status400", statusName: "Done" },
];
