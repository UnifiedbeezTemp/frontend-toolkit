export const AUTOMATION_CATEGORY_CONFIG = [
  {
    label: "Sales and Lead Generation",
    slug: "sales-and-lead-generation",
    apiCategory: "SALES_LEAD_GENERATION",
    iconKey: "autoImg1",
  },
  {
    label: "Support and Escalation",
    slug: "support-escalation",
    apiCategory: "SUPPORT_ESCALATION",
    iconKey: "autoImg2",
  },
  {
    label: "Retention and Nurture",
    slug: "retention-nurture",
    apiCategory: "RETENTION_NURTURE",
    iconKey: "autoImg3",
  },
  {
    label: "Re-engagement and Campaigns",
    slug: "reengagement-campaigns",
    apiCategory: "REENGAGEMENT_CAMPAIGNS",
    iconKey: "autoImg1",
  },
] as const;

export const AUTOMATION_TYPES = AUTOMATION_CATEGORY_CONFIG.map(
  (category) => category.label,
);
