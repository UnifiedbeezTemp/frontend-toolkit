export const MOODS = [
  { label: "Productive", emoji: "🚀" },
  { label: "Focused", emoji: "🎯" },
  { label: "Happy", emoji: "😊" },
  { label: "Relaxed", emoji: "🧘" },
  { label: "Inspired", emoji: "💡" },
  { label: "Grateful", emoji: "🙏" },
  { label: "Neutral", emoji: "😐" },
  { label: "Tired", emoji: "😫" },
  { label: "Stressed", emoji: "😰" },
  { label: "Sad", emoji: "😔" },
  { label: "Angry", emoji: "😠" },
  { label: "Excited", emoji: "🤩" },
  { label: "Confident", emoji: "💪" },
  { label: "Melancholy", emoji: "☁️" },
  { label: "Optimistic", emoji: "☀️" },
  { label: "Creative", emoji: "🎨" },
];

export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;

export const TASK_CATEGORIES = [
  "Follow-up",
  "Meeting",
  "Email",
  "Research",
  "Call",
] as const;

export const TASK_REMINDERS = [
  "None",
  "5 Minutes before",
  "15 Minutes before",
  "1 Hour before",
  "1 Day before",
] as const;

export const TASK_ASSIGNEES = [
  {
    name: "Carolyn Allen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Alice Miles",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export const TASK_VIEW_FILTERS = [
  { label: "Total Task", value: "all" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed Tasks", value: "completed" },
  { label: "To-Do Tasks", value: "to-do" },
] as const;

export const TASK_GROUP_OPTIONS = [
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
  { label: "Date", value: "date" },
] as const;
