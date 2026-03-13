import { ActivityCategory } from "./types";

export const CATEGORY_STYLES: Record<
  ActivityCategory,
  {
    bgColor: string;
    borderColor: string;
    leftBorderColor: string;
    badgeColor: string;
    icon: string;
  }
> = {
  call: {
    icon: "phoneWhite",
    bgColor: "bg-brand-primary",
    badgeColor: "bg-soft-green text-brand-primary border-primary-50",
    borderColor: "border-brand-primary",
    leftBorderColor: "border-l-brand-primary",
  },
  email: {
    icon: "whiteMail",
    bgColor: "bg-warning",
    badgeColor: "bg-soft-green text-brand-primary border-primary-50",
    borderColor: "border-warning",
    leftBorderColor: "border-l-warning",
  },
  meeting: {
    icon: "calendar",
    bgColor: "bg-purple-100",
    badgeColor: "bg-warning/10 text-warning border-warning",
    borderColor: "border-purple-100",
    leftBorderColor: "border-l-purple-100",
  },
  note: {
    icon: "phNote",
    bgColor: "bg-primary-blue",
    badgeColor: "bg-soft-green text-brand-primary border-primary-50",
    borderColor: "border-primary-blue",
    leftBorderColor: "border-l-primary-blue",
  },
  video: {
    icon: "tablerVideo",
    bgColor: "bg-orange-100",
    badgeColor: "bg-soft-green text-brand-primary border-primary-50",
    borderColor: "border-orange-100",
    leftBorderColor: "border-l-orange-100",
  },
};
