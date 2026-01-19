import React from "react";

export interface ComparisonFeature {
  key: string;
  label: string;
}

export interface ComparisonPlan {
  id: string;
  name: string;
  description: string;
  iconKey: string;
  addonStatus: string;
  addonAvailable: boolean;
  tag?: React.ReactNode;
  tagBg?: string;
  tagColor?: string;
  values: Record<string, string | React.ReactNode>;
  ctaText: string;
  footerText: string;
  footerIcon?: string;
  badge?: React.ReactNode;
  isCurrentPlan?: boolean;
}

export interface ComparisonTableProps {
  className?: string;
  onSelectPlan?: (planId: string) => void;
}
