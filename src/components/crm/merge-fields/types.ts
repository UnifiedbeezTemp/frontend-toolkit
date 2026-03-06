export interface MergeField {
  id: string;
  name: string;
  type: string;
  autoFillTag: string;
  category: MergeFieldCategory;
  required: boolean;
  createdAt: string;
}

export type MergeFieldCategory = "audience" | "message" | "social" | "profile";
