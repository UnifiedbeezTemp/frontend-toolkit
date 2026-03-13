import { OverviewData, OverviewIcons } from "../types";

export const getOverviewData = (icons: OverviewIcons): OverviewData[] => [
  {
    title: "Sales & Lead Generation",
    icon: icons.featuredIcon1,
    value: "247",
    label: "Campaigns",
    trend: {
      text: "2 new branches created",
      type: "positive",
    },
    linkHref: "/automations/library?category=sales-lead-generation",
    automationType: "Sales and Lead Generation",
  },
  {
    title: "Support & Escalation",
    icon: icons.featuredIcon2,
    value: "247",
    label: "Tags",
    trend: {
      text: "5 new triggers added",
      type: "positive",
    },
    linkHref: "/automations/library?category=support-escalation",
    automationType: "Support and Escalation",
  },
  {
    title: "Retention & Nurture",
    icon: icons.featuredIcon3,
    value: "247",
    label: "Contacts",
    trend: {
      text: "3 new members deleted",
      type: "negative",
    },
    linkHref: "/automations/library?category=retention-nurture",
    automationType: "Retention and Nurture",
  },
  {
    title: "Re-engagement & Campaigns",
    icon: icons.featuredIcon4,
    value: "1203",
    label: "Automations",
    trend: {
      text: "100 new tags added",
      type: "positive",
    },
    linkHref: "/automations/library?category=reengagement-campaigns",
    automationType: "Re-engagement and Campaigns",
  },
];
