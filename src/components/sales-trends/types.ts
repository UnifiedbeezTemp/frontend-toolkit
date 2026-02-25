import { ReactNode } from "react";

export type ChartType = "bar" | "line" | "area";

export type TimeRange = "12m" | "30d" | "7d" | "24h";

export type ViewTab = "sales" | "listing";

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  className: string;
}

export interface ChartDataPoint {
  month: string;
  sales: number;
}

export interface MetricCategory {
  label: string;
  value: string;
}
