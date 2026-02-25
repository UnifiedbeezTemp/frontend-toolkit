import { DiaryEntry } from "../../../store/slices/diarySlice";

export const generateDiaryData = (count: number = 25): DiaryEntry[] => {
  const moods = ["Productive", "Focused", "Calm", "Optimistic", "Creative"];
  const titles = [
    "Strategy Meeting",
    "Product Training",
    "Client Call",
    "Documentation Review",
    "Feature Planning",
    "Code Refactoring",
    "Team Lunch",
    "Design Workshop",
    "App Security Review",
    "User Research Study",
  ];
  const contents = [
    "Today was highly productive. Successfully completed the team training session and received excellent feedback.",
    "Deep dive into the new feature set. Re-trained the support team on user onboarding flows.",
    "Discussed the roadmap for Q4 and identified key performance indicators.",
    "Worked on resolving technical debt in the frontend architecture. Performance improved by 20%.",
    "Presented the new design system to stakeholders. All approvals received.",
    "Integrated the social auth hook and verified the login flow works correctly.",
    "Spent the morning drafting the documentation for the API endpoints.",
    "Collaborated with the UX team on wireframes for the new dashboard modules.",
    "Fixed critical bugs in the notification system. Reliability increased.",
    "Explored the use of AI agents for automating routine coding tasks.",
  ];

  const entries: DiaryEntry[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    entries.push({
      id: (i + 1).toString(),
      name:
        titles[i % titles.length] +
        (i >= titles.length ? ` ${Math.floor(i / titles.length) + 1}` : ""),
      date: date.toISOString(),
      content: contents[i % contents.length],
      mood: moods[i % moods.length],
      tags: [`tag-${i % 5}`, `tag-${(i + 1) % 5}`],
    });
  }
  return entries;
};
