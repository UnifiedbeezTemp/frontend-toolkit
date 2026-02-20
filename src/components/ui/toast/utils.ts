import { ToastVariant } from "./types";

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  LucideIcon,
} from "lucide-react";

export const variantClasses: Record<ToastVariant, string> = {
  success: "bg-secondary-green-5 border-success text-success shadow-lg",
  error: "bg-danger-5 border-destructive text-destructive shadow-lg",
  info: "bg-primary-10 border-brand-primary text-brand-primary shadow-lg",
  warning: "bg-secondary-5 border-warning text-warning shadow-lg",
};

export const variantIcons: Record<ToastVariant, LucideIcon> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export const iconClasses: Record<ToastVariant, string> = {
  success: "text-success",
  error: "text-destructive",
  info: "text-brand-primary",
  warning: "text-warning",
};

export const formatToastText = (value: unknown) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (
    typeof value === "object" &&
    "message" in (value as Record<string, unknown>)
  ) {
    const msg = (value as Record<string, unknown>).message;
    if (typeof msg === "string") return msg;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};
