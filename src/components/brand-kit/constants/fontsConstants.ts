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
  Light: 300,
  Regular: 400,
  Bold: 700,
  "Extra Bold": 800,
};

export const FONT_STYLES: FontStyle[] = ["Normal", "Italic"];
