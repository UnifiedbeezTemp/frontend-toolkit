"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  BrandKitReadonlyState,
  SocialLink,
} from "../types/brandKitTypes";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
  BrandKitResponse,
  LogoUploadResponse,
  BrandDetectionPayload,
  BrandDetectionSseEvent,
  BrandDetectionResponse,
} from "../../../types/brandKitApiTypes";
import { ToastPayload } from "../../ui/toast/types";

export interface BrandDetectionOverride {
  logoUrl?: string;
  primaryColor?: string;
}

export interface UseBrandKitActionsProps {
  // State
  colors: BrandColorsState;
  fonts: BrandFontState;
  links: SocialLink[];
  logo: string | null;
  pendingLogoFile: File | null;
  brandKitData?: ApiBrandKit;
  websiteUrl: string;
  detectedFaviconUrl: string;
  readonlyFields: BrandKitReadonlyState;
  // State Setters
  setColors: Dispatch<SetStateAction<BrandColorsState>>;
  setFonts: Dispatch<SetStateAction<BrandFontState>>;
  setLinks: Dispatch<SetStateAction<SocialLink[]>>;
  setLogo: Dispatch<SetStateAction<string | null>>;
  setWebsiteUrl: Dispatch<SetStateAction<string>>;
  setDetectedFaviconUrl: Dispatch<SetStateAction<string>>;
  setReadonlyFields: Dispatch<SetStateAction<BrandKitReadonlyState>>;
  setPendingLogoFile: Dispatch<SetStateAction<File | null>>;
  removeLogo: () => void;
  setDetectionOverride: (override: BrandDetectionOverride | null) => void;
  // Helpers
  mapApiToState: (data: ApiBrandKit) => BrandKitState;
  mapStateToPayload: (state: BrandKitState) => UpdateBrandKitPayload;
  showToast: (payload: ToastPayload) => void;
  refetch: () => Promise<unknown>;
  // Mutations
  updateBrandKitMutation: (
    payload: UpdateBrandKitPayload,
  ) => Promise<BrandKitResponse>;
  uploadLogoMutation: (file: File) => Promise<LogoUploadResponse>;
  deleteLogoMutation: () => Promise<{ message: string }>;
  detectBrandMutation: (
    payload: BrandDetectionPayload,
  ) => Promise<BrandDetectionResponse>;

  // Detection UI
  onDetectionStart: (websiteUrl: string) => void;
  onDetectionEvent: (event: BrandDetectionSseEvent) => void;
  onDetectionComplete: (data: BrandDetectionResponse) => void;
  onDetectionError: (message: string) => void;
}
