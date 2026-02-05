import { ToastVariant } from "./types";

export const variantClasses: Record<ToastVariant, string> = {
  success: "bg-success/10 border-success/40 text-brand-primary",
  error: "bg-destructive/10 border-destructive/40 text-destructive",
  info: "bg-brand-primary/10 border-brand-primary/40 text-brand-primary",
  warning: "bg-warning/10 border-warning/40 text-warning",
};

export const variantDot: Record<ToastVariant, string> = {
  success: "bg-success",
  error: "bg-destructive",
  info: "bg-brand-primary",
  warning: "bg-warning",
};

export const formatToastText = (value: unknown) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "message" in (value as Record<string, unknown>)) {
    const msg = (value as Record<string, unknown>).message;
    if (typeof msg === "string") return msg;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

