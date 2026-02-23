import { ChartDataPoint, MetricCategory } from "../types";

export const CHART_DATA: ChartDataPoint[] = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 5800 },
  { month: "Mar", sales: 4200 },
  { month: "Apr", sales: 7500 },
  { month: "May", sales: 6800 },
  { month: "Jun", sales: 9200 },
  { month: "Jul", sales: 12500 },
  { month: "Aug", sales: 4000 },
  { month: "Sep", sales: 3200 },
  { month: "Oct", sales: 5500 },
  { month: "Nov", sales: 2800 },
  { month: "Dec", sales: 1800 },
];

export const METRIC_CATEGORIES: MetricCategory[] = [
  { label: "Sales & Marketing", value: "sales-marketing" },
  { label: "Operations", value: "operations" },
  { label: "Support", value: "support" },
];

export const STAT_VALUES = {
  sales: "£81,700",
  averageSales: "£6,808",
  totalOrders: "2,205",
  totalCustomers: "2,205",
} as const;

export const TIME_RANGES = ["12m", "30d", "7d", "24h"] as const;

export const VIEW_TABS = [
  { label: "Sales Trends", value: "sales" },
  { label: "Listing Trends", value: "listing" },
] as const;
