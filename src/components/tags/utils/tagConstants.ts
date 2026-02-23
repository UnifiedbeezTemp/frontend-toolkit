import { TagCategory } from "../../../store/slices/tagSlice";

export const TAG_CATEGORIES = [
  { id: "contact-type", label: "Contact Type", emoji: "👤" },
  { id: "intent-action", label: "Intent & Action", emoji: "🎯" },
  { id: "source-origin", label: "Source / Origin", emoji: "🎯" },
  { id: "engagement-level", label: "Engagement Level", emoji: "📊" },
  { id: "actions-behavior", label: "Actions & Behavior", emoji: "⚡" },
] as const;

export const CATEGORY_MAP = TAG_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id as TagCategory] = cat;
    return acc;
  },
  {} as Record<TagCategory, (typeof TAG_CATEGORIES)[number]>,
);
