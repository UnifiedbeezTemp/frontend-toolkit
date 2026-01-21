import { QuickFilterOption } from "../components/QuickFilterBar";

export const MAIN_FILTER_OPTIONS = [
  { label: "Channels", value: "channels" },
  { label: "Tags", value: "tags" },
  { label: "Name", value: "name" },
];

export const GENERAL_FILTERS: QuickFilterOption[] = [
  {
    label: "All conversations",
    options: [
      { label: "Assigned to me", value: "self" },
      { label: "Not assigned", value: "not_assigned" },
    ],
  },
  {
    label: "Unread",
    options: [
      { label: "Assigned to me", value: "self" },
      { label: "Not assigned", value: "not_assigned" },
    ],
  },
  {
    label: "Labels",
    options: [
      { label: "Omolayo", value: "label-1" },
      { label: "Support Team", value: "label-2" },
      { label: "Sales Department", value: "label-3" },
      { label: "Customer Service", value: "label-4" },
      { label: "Technical Support", value: "label-5" },
    ],
  },
];

export const TEAM_FILTERS: QuickFilterOption[] = [
  {
    label: "All conversations",
    options: [
      { label: "Assigned to me", value: "self" },
      { label: "Not assigned", value: "not_assigned" },
    ],
  },
  {
    label: "Group",
    options: [
      { label: "Engineering", value: "eng" },
      { label: "Support", value: "support" },
    ],
  },
  {
    label: "Team",
    options: [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
    ],
  },
];
