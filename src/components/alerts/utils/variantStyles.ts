import { AlertVariant } from "../types";

interface VariantStyle {
  bg: string;
  text: string;
}

export const VARIANT_STYLES: Record<AlertVariant, VariantStyle> = {
  success: {
    bg: "bg-success/10",
    text: "text-success",
  },
  danger: {
    bg: "bg-danger-5",
    text: "text-danger-100",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
  },
  neutral: {
    bg: "bg-input-filled",
    text: "text-text-primary",
  },
};
