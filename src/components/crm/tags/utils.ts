import { CRMTag } from "./types";
import { allTags } from "../../inbox/temp/crmTags";
import { TAG_CATEGORIES } from "../../tags/utils/tagConstants";
import { AUTO_FILL_TAGS } from "./constants";
import { TagCategory } from "../../../store/slices/tagSlice";

export const generateDummyTags = (): CRMTag[] => {
  return allTags.map((tag, index) => ({
    id: tag.id,
    label: tag.label,
    category: tag.category as TagCategory,
    autoFillTag: AUTO_FILL_TAGS[index % AUTO_FILL_TAGS.length],
    contactsCount: Math.floor(Math.random() * 500) + 10,
    createdAt: new Date().toISOString(),
  }));
};

export const getCategoryLabel = (categoryId: string): string => {
  const category = TAG_CATEGORIES.find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
};
