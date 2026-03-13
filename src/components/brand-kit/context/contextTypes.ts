"use client";

import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  SocialLink,
} from "../types/brandKitTypes";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
  BrandKitResponse,
  LogoUploadResponse,
  BrandDetectionResponse,
} from "../../../types/brandKitApiTypes";
import { ToastPayload } from "../../ui/toast/types";

export interface UseBrandKitActionsProps {
  // State
  colors: BrandColorsState;
  fonts: BrandFontState;
  links: SocialLink[];
  logo: string | null;
  pendingLogoFile: File | null;
  brandKitData?: ApiBrandKit;
  // State Setters
  setColors: (colors: BrandColorsState) => void;
  setFonts: (fonts: BrandFontState) => void;
  setLinks: (links: SocialLink[]) => void;
  setLogo: (logo: string | null) => void;
  setPendingLogoFile: (file: File | null) => void;
  removeLogo: () => void;
  // Helpers
  mapApiToState: (data: ApiBrandKit) => BrandKitState;
  mapStateToPayload: (state: BrandKitState) => UpdateBrandKitPayload;
  showToast: (payload: ToastPayload) => void;
  refetch: () => void;
  // Mutations
  updateBrandKitMutation: (
    payload: UpdateBrandKitPayload,
  ) => Promise<BrandKitResponse>;
  uploadLogoMutation: (file: File) => Promise<LogoUploadResponse>;
  deleteLogoMutation: () => Promise<{ message: string }>;
  detectBrandMutation: (payload: {
    websiteUrl: string;
  }) => Promise<BrandDetectionResponse>;
}
