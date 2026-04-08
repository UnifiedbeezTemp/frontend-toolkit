export const EMAIL_SAFE_FONTS = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
] as const;

import { FontWeight, FontStyle } from "../types/brandKitTypes";

export const FONT_WEIGHTS: Record<FontWeight, number> = {
  "400": 400,
  "500": 500,
  "600": 600,
  "700": 700,
};

export const FONT_STYLES: FontStyle[] = ["Normal", "Italic"];
