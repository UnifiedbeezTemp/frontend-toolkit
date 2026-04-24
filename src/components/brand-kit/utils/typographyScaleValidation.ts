import { TypographyScaleState } from "../types/brandKitTypes";

export type TypographyScaleField = keyof TypographyScaleState;

const CSS_LENGTH_VALUE_PATTERN =
  /^(?:0|(?:\d+|\d*\.\d+)(?:px|rem|em|%|vw|vh|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh|ch|ex|cm|mm|in|pt|pc|q|cap|ic|lh|rlh))$/i;
const CSS_SIZE_FUNCTION_PATTERN = /^(?:calc|min|max|clamp|var)\(.+\)$/i;

const TYPOGRAPHY_SCALE_FIELD_LABELS: Record<TypographyScaleField, string> = {
  h1: "H1",
  h2: "H2",
  h3: "H3",
  body: "Body",
};

export const isValidTypographyScaleValue = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return false;
  if (CSS_LENGTH_VALUE_PATTERN.test(trimmed)) return true;
  if (!CSS_SIZE_FUNCTION_PATTERN.test(trimmed)) return false;

  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return false;
  }

  return CSS.supports("font-size", trimmed);
};

export const getInvalidTypographyScaleFields = (
  scale: TypographyScaleState,
): TypographyScaleField[] =>
  (Object.keys(scale) as TypographyScaleField[]).filter(
    (field) => !isValidTypographyScaleValue(scale[field]),
  );

export const formatTypographyScaleFieldList = (
  fields: TypographyScaleField[],
) => {
  const labels = fields.map((field) => TYPOGRAPHY_SCALE_FIELD_LABELS[field]);

  if (labels.length <= 1) return labels[0] ?? "";
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;

  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
};

export const getInvalidTypographyScaleMessage = (
  fields: TypographyScaleField[],
) => {
  const names = formatTypographyScaleFieldList(fields);

  if (!names) return "";

  return `${names} ${fields.length === 1 ? "field is" : "fields are"} invalid.`;
};
