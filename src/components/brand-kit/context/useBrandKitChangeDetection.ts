"use client";

import { useMemo } from "react";
import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  SocialLink,
} from "../types/brandKitTypes";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes";

interface UseChangeDetectionProps {
  brandKitData?: ApiBrandKit;
  colors: BrandColorsState;
  fonts: BrandFontState;
  links: SocialLink[];
  logo: string | null;
  pendingLogoFile: File | null;
  mapStateToPayload: (state: BrandKitState) => UpdateBrandKitPayload;
}

export function useBrandKitChangeDetection({
  brandKitData,
  colors,
  fonts,
  links,
  logo,
  pendingLogoFile,
  mapStateToPayload,
}: UseChangeDetectionProps) {
  return useMemo(() => {
    if (!brandKitData) return false;

    // 1. Check for staged logo file
    if (pendingLogoFile) return true;

    const currentState: BrandKitState = {
      colors,
      fonts,
      socialLinks: links,
      logo,
    };
    const payload = mapStateToPayload(currentState);
    const initialPayload = brandKitData;

    // Compare relevant metadata fields (excluding logo)
    const fields: (keyof UpdateBrandKitPayload)[] = [
      "lightPrimary",
      "lightBackground",
      "darkPrimary",
      "darkBackground",
      "accentColor",
      "buttonColor",
      "buttonBackgroundColor",
      "buttonStrokeColor",
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
    ];

    return fields.some((field) => {
      const current = (payload[field] ?? "").toString().toLowerCase().trim();
      const initial = (initialPayload[field as keyof ApiBrandKit] ?? "")
        .toString()
        .toLowerCase()
        .trim();
      return current !== initial;
    });
  }, [
    brandKitData,
    colors,
    fonts,
    links,
    logo,
    mapStateToPayload,
    pendingLogoFile,
  ]);
}
