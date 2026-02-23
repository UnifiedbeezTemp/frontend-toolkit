import { AlertItem, AlertCategory } from "../types";

export const ALERT_CATEGORIES: AlertCategory[] = [
  { label: "Sales & Marketing", value: "sales-marketing" },
  { label: "Operations", value: "operations" },
  { label: "Support", value: "support" },
];

export const ALERTS_DATA: AlertItem[] = [
  { id: "1", label: "Open Offers", count: 44, variant: "warning" },
  { id: "2", label: "New Registrations", count: 0, variant: "neutral" },
  { id: "3", label: "Open Offers", count: 20, variant: "danger" },
  { id: "4", label: "New Registrations", count: 7, variant: "success" },
  { id: "5", label: "Properties Not On Market", count: 44, variant: "danger" },
  { id: "6", label: "New Registrations", count: 5, variant: "success" },
  { id: "7", label: "Sales In Progress", count: 50, variant: "danger" },
  { id: "8", label: "Open Valuation", count: 90, variant: "danger" },
  { id: "9", label: "Open Valuation", count: 90, variant: "danger" },
  { id: "10", label: "Open Offers", count: 20, variant: "success" },
];

export const NEW_ALERTS_COUNT = 2;
