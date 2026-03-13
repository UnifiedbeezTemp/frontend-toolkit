import { TaskItem } from "../../../store/slices/diarySlice";

const ASSIGNEES = [
  {
    name: "Alice Miles",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "John Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Maria Lopez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    name: "David Park",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
];

const TITLES = [
  "Follow up on proposal",
  "Schedule demo call",
  "Research client requirements",
  "Prepare quarterly report",
  "Update documentation",
  "Review pull requests",
  "Send invoice to client",
  "Plan team offsite",
  "Finalize design mockups",
  "Migrate database schema",
];

const DESCRIPTIONS = [
  "Send follow-up email regarding the premium package proposal",
  "Book a product demo session with the client",
  "Compile a comprehensive list of client feature requests",
  "Summarize performance metrics and KPIs for the quarter",
  "Update the onboarding guide with latest product changes",
  "Review and approve pending code changes before deployment",
  "Generate and send the final invoice for services rendered",
  "Organize team-building activities and venue logistics",
  "Complete high-fidelity mockups for the new dashboard",
  "Plan and execute the migration to the updated schema",
];

const CATEGORIES = ["Follow-up", "Meeting", "Email", "Research", "Call"];
const PRIORITIES: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];

export const generateTaskData = (count: number = 18): TaskItem[] => {
  const tasks: TaskItem[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) - 3);
    date.setHours(Math.floor(Math.random() * 10) + 8);
    date.setMinutes(Math.floor(Math.random() * 4) * 15);

    const isCompleted = i > count * 0.6;

    tasks.push({
      id: `t${i + 1}`,
      title:
        TITLES[i % TITLES.length] +
        (i >= TITLES.length ? ` ${Math.floor(i / TITLES.length) + 1}` : ""),
      description: DESCRIPTIONS[i % DESCRIPTIONS.length],
      priority: PRIORITIES[i % PRIORITIES.length],
      category: CATEGORIES[i % CATEGORIES.length],
      dueDate: date.toISOString(),
      completed: isCompleted,
      assignee: ASSIGNEES[i % ASSIGNEES.length],
    });
  }

  return tasks;
};
