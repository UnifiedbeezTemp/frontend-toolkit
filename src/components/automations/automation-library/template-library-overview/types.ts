export interface OverviewData {
  title: string;
  icon: string;
  value: string;
  label: string;
  trend: {
    text: string;
    type: "positive" | "negative";
  };
  linkHref: string;
  automationType: string;
}

export type OverviewIcons = {
  featuredIcon1: string;
  featuredIcon2: string;
  featuredIcon3: string;
  featuredIcon4: string;
};
