import { MergeField, MergeFieldCategory } from "./types";

export const MERGE_FIELD_TABS: {
  label: string;
  value: MergeFieldCategory;
}[] = [
  { label: "Audience", value: "audience" },
  { label: "Message", value: "message" },
  { label: "Social", value: "social" },
  { label: "Profile", value: "profile" },
];

export const FIELD_TABLE_HEADERS = [
  { label: "Field Name", className: "w-[25%]" },
  { label: "Type", className: "w-[20%]" },
  { label: "Auto-Fill Tag", className: "w-[35%]" },
  { label: "Action", className: "w-[20%]" },
];

export const FIELD_TYPES = [
  "Text Input",
  "Number",
  "Date",
  "Dropdown",
  "Checkbox",
  "Email",
  "Phone",
  "URL",
];

export const FIELD_DETAIL_FIELDS = (field: MergeField) => [
  { label: "Type", value: field.type },
  { label: "Auto-Fill Tag", value: field.autoFillTag },
  { label: "Category", value: field.category },
  { label: "Required", value: field.required ? "Yes" : "No" },
];
