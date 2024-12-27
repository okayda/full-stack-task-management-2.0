import { TaskPriority } from "@/features/board/types";

export const boardNameExampleData = "Data Example 👀";

export const boardNameExampleColumns = "Columns Example 👀";

export const tasksExample = [
  {
    taskName: "Define brand style guide",
    description:
      "Set color palette, typography, and design guidelines for brand consistency.",
    priority: TaskPriority.MEDIUM,
    statusId: "status100",
    position: 1000,
    subtasks: [
      { subtaskName: "Draft color palette", isCompleted: false },
      { subtaskName: "Select typography", isCompleted: false },
      { subtaskName: "Compile design guidelines doc", isCompleted: false },
    ],
  },
  {
    taskName: "Implement global navigation",
    description:
      "Set up site-wide header, footer, and dynamic navigation menu.",
    priority: TaskPriority.HIGHEST,
    statusId: "status200",
    position: 1000,
    subtasks: [
      { subtaskName: "Design header layout", isCompleted: false },
      { subtaskName: "Add dynamic menu items", isCompleted: false },
      { subtaskName: "Implement responsive footer", isCompleted: false },
    ],
  },
  {
    taskName: "Build user registration flow",
    description:
      "Create sign-up page with validations and integrate with backend.",
    priority: TaskPriority.HIGH,
    statusId: "status300",
    position: 1000,
    subtasks: [
      { subtaskName: "Design registration form", isCompleted: false },
      { subtaskName: "Implement client-side validation", isCompleted: false },
      { subtaskName: "Connect form to backend API", isCompleted: false },
    ],
  },
  {
    taskName: "Set up continuous integration",
    description:
      "Automate builds, tests, and deployments using a CI/CD service.",
    priority: TaskPriority.HIGHEST,
    statusId: "status400",
    position: 1000,
    subtasks: [
      { subtaskName: "Configure build pipeline", isCompleted: true },
      { subtaskName: "Automate test runs", isCompleted: true },
      { subtaskName: "Automate deployment to staging", isCompleted: true },
    ],
  },
  {
    taskName: "Implement product listing page",
    description: "Display products with pagination and filtering options.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 2000,
    subtasks: [
      { subtaskName: "Design product card layout", isCompleted: false },
      { subtaskName: "Implement pagination logic", isCompleted: false },
      { subtaskName: "Add filtering functionality", isCompleted: false },
    ],
  },
  {
    taskName: "Optimize mobile responsiveness",
    description: "Ensure all pages are fully responsive and mobile-friendly.",
    priority: TaskPriority.LOWEST,
    statusId: "status200",
    position: 2000,
    subtasks: [
      { subtaskName: "Refine breakpoints in CSS", isCompleted: false },
      { subtaskName: "Test on multiple mobile devices", isCompleted: false },
      { subtaskName: "Optimize images for mobile", isCompleted: false },
    ],
  },
  {
    taskName: "Integrate social login",
    description: "Allow users to log in with Google and Facebook.",
    priority: TaskPriority.HIGH,
    statusId: "status300",
    position: 2000,
    subtasks: [
      { subtaskName: "Configure Google OAuth", isCompleted: false },
      { subtaskName: "Configure Facebook login", isCompleted: false },
      {
        subtaskName: "Implement fallback for standard login",
        isCompleted: false,
      },
    ],
  },
  {
    taskName: "Add error tracking and reporting",
    description:
      "Integrate Sentry (or similar) to capture and manage application errors.",
    priority: TaskPriority.MEDIUM,
    statusId: "status400",
    position: 2000,
    subtasks: [
      { subtaskName: "Add Sentry to frontend", isCompleted: true },
      { subtaskName: "Add Sentry to backend", isCompleted: true },
      {
        subtaskName: "Set up error notifications and alerts",
        isCompleted: true,
      },
    ],
  },
  {
    taskName: "Enable full-text search",
    description:
      "Allow users to search across blog posts and product descriptions.",
    priority: TaskPriority.HIGH,
    statusId: "status100",
    position: 3000,
    subtasks: [
      { subtaskName: "Configure search index", isCompleted: false },
      { subtaskName: "Develop search API endpoint", isCompleted: false },
      { subtaskName: "Add search bar to UI", isCompleted: false },
    ],
  },
  {
    taskName: "Configure Docker containerization",
    description: "Create Dockerfiles for consistent and portable deployments.",
    priority: TaskPriority.HIGHEST,
    statusId: "status200",
    position: 3000,
    subtasks: [
      { subtaskName: "Write Dockerfile for frontend", isCompleted: false },
      { subtaskName: "Write Dockerfile for backend", isCompleted: false },
      {
        subtaskName: "Set up docker-compose for local dev",
        isCompleted: false,
      },
    ],
  },
];

export const statusColumnExample = [
  { statusId: "status100", statusName: "Todo" },
  { statusId: "status200", statusName: "In Progress" },
  { statusId: "status300", statusName: "In Review" },
  { statusId: "status400", statusName: "Done" },
];

export const defaultStatusColumn = [
  { statusId: "status100", statusName: "Todo" },
  { statusId: "status200", statusName: "Done" },
];
