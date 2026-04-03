import type { FontWeight } from "../../types/brandKitTypes";

export const nonEmptyString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const extractFirstFontFamily = (value: string | null): string | null => {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  if (!first) return null;
  return first.replace(/^["']|["']$/g, "");
};

export const normalizeFontWeight = (value: string | null): FontWeight | null => {
  if (!value) return null;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return null;

  if (trimmed === "normal" || trimmed === "regular") return "400";
  if (trimmed === "bold") return "700";

  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isFinite(numeric)) {
    if (numeric <= 400) return "400";
    if (numeric <= 500) return "500";
    if (numeric <= 600) return "600";
    return "700";
  }

  if (trimmed.includes("bold")) return "700";
  if (trimmed.includes("light")) return "400";
  return null;
};

