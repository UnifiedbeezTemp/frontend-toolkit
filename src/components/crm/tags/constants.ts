import { CRMTag } from "./types";

export const TAG_TABLE_HEADERS = [
  { label: "Tag Name", className: "w-[30%]" },
  { label: "Type", className: "w-[20%]" },
  { label: "Auto-Fill Tag", className: "w-[30%]" },
  { label: "Action", className: "w-[20%]" },
];

export const TAG_DETAIL_FIELDS = (tag: CRMTag) => [
  { label: "Auto-Fill Tag", value: tag.autoFillTag },
  { label: "Contacts", value: tag.contactsCount.toLocaleString() },
  { label: "Category", value: tag.category },
];

export const AUTO_FILL_TAGS = [
  "%EMAIL_ADDRESSES%",
  "%FULL_NAMES%",
  "%FIRST_NAMES%",
  "%LAST_NAMES%",
  "%PHONE_NUMBERS%",
  "%ISO_COUNTRYS%",
  "%ISO_ADDRESS%",
  "%TIME_SUBSCRIBERS%",
  "%SUBSCRIBER_ES%",
  "%POSITION_ROLES%",
];
