import { DiaryEntry } from "../../../store/slices/diarySlice";

export const generateDiaryData = (): DiaryEntry[] => {
  return [
    {
      id: "1",
      name: "Strategy Meeting",
      date: "2025-09-18T10:00:00Z",
      content:
        "Today was highly productive. Successfully completed the team training session and received excellent feedback from all participants. We discussed the roadmap for Q4 and identified key performance indicators.",
      mood: "Productive",
      tags: ["tag-0", "tag-1"],
    },
    {
      id: "2",
      name: "Product Training",
      date: "2025-09-18T14:00:00Z",
      content:
        "Deep dive into the new feature set. Re-trained the support team on user onboarding flows. Need to follow up on the API documentation gaps identified during the session.",
      mood: "Focused",
      tags: ["tag-2", "tag-3"],
    },
  ];
};
