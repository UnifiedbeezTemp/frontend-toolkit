import { TagCategory } from "../../../../store/slices/tagSlice";

export interface CRMTag {
  id: string;
  label: string;
  category: TagCategory;
  autoFillTag: string;
  contactsCount: number;
  createdAt: string;
}
