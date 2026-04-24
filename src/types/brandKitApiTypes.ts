export interface ApiFontColors {
  headingColor: string | null;
  bodyColor: string | null;
  linkColor: string | null;
  mutedColor: string | null;
}

export interface ApiTypographyScale {
  h1: string | null;
  h2: string | null;
  h3: string | null;
  body: string | null;
}

export interface ApiBrandKit {
  id?: number;
  userId?: number;
  websiteUrl?: string | null;
  companyLogoUrl: string | null;
  detectedFaviconUrl: string | null;
  lightPrimary: string | null;
  lightBackground: string | null;
  darkPrimary: string | null;
  darkBackground: string | null;
  accentColor: string | null;
  buttonColor: string | null;
  buttonStrokeColor: string | null;
  buttonTextColor: string | null;
  headerFontStyle: string | null;
  headerFontWeight: string | null;
  bodyFontStyle: string | null;
  bodyFontWeight: string | null;
  fontColors: ApiFontColors | null;
  typographyScale: ApiTypographyScale | null;
  instagram: string | null;
  whatsapp: string | null;
  twitter: string | null;
  youtube: string | null;
  facebook: string | null;
  linkedin: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type BrandKitResponse = ApiBrandKit;

export interface UpdateBrandKitPayload {
  detectedFaviconUrl?: string | null;
  fontColors?: ApiFontColors;
  typographyScale?: ApiTypographyScale;
  lightPrimary?: string;
  lightBackground?: string;
  darkPrimary?: string;
  darkBackground?: string;
  accentColor?: string;
  buttonColor?: string;
  buttonStrokeColor?: string | null;
  buttonTextColor?: string | null;
  headerFontStyle?: string;
  headerFontWeight?: string;
  bodyFontStyle?: string;
  bodyFontWeight?: string;
  instagram?: string | null;
  whatsapp?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
}

export const EDITABLE_BRAND_KIT_FIELDS = [
  "detectedFaviconUrl",
  "fontColors",
  "typographyScale",
  "lightPrimary",
  "lightBackground",
  "darkPrimary",
  "darkBackground",
  "accentColor",
  "buttonColor",
  "buttonStrokeColor",
  "buttonTextColor",
  "headerFontStyle",
  "headerFontWeight",
  "bodyFontStyle",
  "bodyFontWeight",
  "instagram",
  "whatsapp",
  "twitter",
  "youtube",
  "facebook",
  "linkedin",
] as const satisfies readonly (keyof UpdateBrandKitPayload)[];

export interface BrandKitErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface LogoUploadResponse {
  logoUrl: string;
}

export interface BrandDetectionPayload {
  websiteUrl: string;
  onEvent?: (event: BrandDetectionSseEvent) => void;
}

export type BrandDetectionEventName = "partial" | "complete" | string;

export interface BrandDetectionSseEvent {
  event: BrandDetectionEventName;
  data: BrandDetectionResponse;
}

export interface BrandDetectionResponse {
  companyLogoUrl?: string | null;
  detectedFaviconUrl?: string | null;
  detectedPrimaryColor?: string | null;
  detectedAccentColor?: string | null;
  detectedBackgroundColor?: string | null;
  detectedButtonColor?: string | null;
  headerFontStyle?: string | null;
  headerFontWeight?: string | null;
  bodyFontStyle?: string | null;
  bodyFontWeight?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  accuracyScore?: number | null;
  advancedSearchTriggered?: boolean;

  // Backwards compatibility
  detectedLogoUrl?: string | null;
  success?: boolean;
}
