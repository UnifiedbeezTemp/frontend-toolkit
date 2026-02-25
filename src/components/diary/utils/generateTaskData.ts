import { TaskItem } from "../../../store/slices/diarySlice";

export const generateTaskData = (): TaskItem[] => {
  return [
    {
      id: "t5",
      title: "Schedule demo call",
      description: "Book a product demo session with the client",
      priority: "Medium",
      dueDate: "2024-06-12T12:32:00Z",
      completed: false,
      assignee: {
        name: "Alice Miles",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
    },
    {
      id: "t6",
      title: "Schedule demo call",
      description: "Book a product demo session with the client",
      priority: "High",
      dueDate: "2024-06-12T12:32:00Z",
      completed: true,
      assignee: {
        name: "Alice Miles",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    },
    {
      id: "t7",
      title: "Research client requirements",
      description: "Today was highly productive...",
      priority: "Low",
      dueDate: "2024-06-12T12:32:00Z",
      completed: true,
      assignee: {
        name: "Alice Miles",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
    },
  ];
};
