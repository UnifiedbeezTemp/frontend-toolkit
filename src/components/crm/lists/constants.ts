import { CRMList } from "./types";

export const TABLE_HEADERS = [
  { label: "List Name", className: "w-[30%]" },
  { label: "Active Contacts", className: "w-[15%]" },
  { label: "Marketing Channel", className: "w-[20%]" },
  { label: "On Submission Actions", className: "w-[20%]" },
  { label: "Submissions", className: "w-[10%]" },
  { label: "Action", className: "w-[5%]" },
];

export const LIST_DETAIL_FIELDS = (list: CRMList) => [
  { label: "Active Contacts", value: list.activeContacts.toLocaleString() },
  { label: "Submissions", value: list.submissions.toLocaleString() },
  { label: "On Submission Action", value: list.onSubmissionAction },
  { label: "Status", value: "Active" },
];
