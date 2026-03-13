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
  instagram?: string;
  whatsapp?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
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
}

export interface BrandDetectionResponse {
  detectedLogoUrl?: string | null;
  detectedPrimaryColor?: string | null;
  detectedFaviconUrl?: string | null;
  success?: boolean;
}
