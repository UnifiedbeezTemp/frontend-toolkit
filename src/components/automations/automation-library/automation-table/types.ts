export interface LibraryAutomation {
  id: string;
  name: string;
  iconKey: string;
  category: LibraryAutomationType;
  businessGoal: string;
  status: "active" | "inactive";
  lastEdited: string;
  currentContact: number;
}

export type LibraryAutomationType =
  | "Sales and Lead Generation"
  | "Support and Escalation"
  | "Retention and Nurture"
  | "Re-engagement and Campaigns";
