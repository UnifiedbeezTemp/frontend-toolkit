import {
  BrandColorsState,
  BrandFontState,
  SocialLink,
} from "../components/brand-kit/types/brandKitTypes";

export interface ApiBrandKit {
  id?: number;
  userId?: number;
  websiteUrl?: string;
  companyLogoUrl: string | null;
  detectedLogoUrl: string | null;
  lightPrimary: string;
  lightBackground: string;
  darkPrimary: string;
  darkBackground: string;
  accentColor: string;
  buttonColor: string;
  buttonBackgroundColor: string;
  buttonStrokeColor: string;
  headerFontStyle: string;
  headerFontWeight: string;
  bodyFontStyle: string;
  bodyFontWeight: string;
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
  websiteUrl?: string;
  lightPrimary?: string;
  lightBackground?: string;
  darkPrimary?: string;
  darkBackground?: string;
  accentColor?: string;
  buttonColor?: string;
  buttonBackgroundColor?: string;
  buttonStrokeColor?: string;
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
