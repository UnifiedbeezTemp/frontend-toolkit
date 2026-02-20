export type AlertVariant = "success" | "danger" | "warning" | "neutral";

export interface AlertItem {
  id: string;
  label: string;
  count: number;
  variant: AlertVariant;
}

export interface AlertCategory {
  label: string;
  value: string;
}
