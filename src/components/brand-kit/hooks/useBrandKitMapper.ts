import { useCallback } from "react";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes";
import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  FontWeight,
  SocialLink,
  SocialPlatform,
} from "../types/brandKitTypes";

const PLATFORM_TO_API_KEY: Record<SocialPlatform, keyof UpdateBrandKitPayload> =
  {
    Instagram: "instagram",
    Facebook: "facebook",
    X: "twitter",
    LinkedIn: "linkedin",
    YouTube: "youtube",
    Website: "whatsapp",
  };

const toFontWeight = (weight: string): FontWeight => {
  const map: Record<string, FontWeight> = {
    Light: "Light",
    Regular: "Regular",
    Bold: "Bold",
    "Extra Bold": "Extra Bold",
  };
  return map[weight] || "Regular";
};

export function useBrandKitMapper() {
  const mapApiToState = useCallback((apiData: ApiBrandKit): BrandKitState => {
    const colors: BrandColorsState = {
      light: {
        primary: apiData.lightPrimary,
        background: apiData.lightBackground,
      },
      dark: {
        primary: apiData.darkPrimary,
        background: apiData.darkBackground,
      },
      accentColor: apiData.accentColor,
      button: {
        color: apiData.buttonColor,
        background: apiData.buttonBackgroundColor,
        stroke: apiData.buttonStrokeColor,
      },
    };

    const fonts: BrandFontState = {
      header: {
        family: apiData.headerFontStyle,
        weight: toFontWeight(apiData.headerFontWeight),
        style: "Normal",
      },
      body: {
        family: apiData.bodyFontStyle,
        weight: toFontWeight(apiData.bodyFontWeight),
        style: "Normal",
      },
    };

    const socialLinks: SocialLink[] = [];
    if (apiData.instagram)
      socialLinks.push({ platform: "Instagram", url: apiData.instagram });
    if (apiData.facebook)
      socialLinks.push({ platform: "Facebook", url: apiData.facebook });
    if (apiData.twitter)
      socialLinks.push({ platform: "X", url: apiData.twitter });
    if (apiData.linkedin)
      socialLinks.push({ platform: "LinkedIn", url: apiData.linkedin });
    if (apiData.youtube)
      socialLinks.push({ platform: "YouTube", url: apiData.youtube });
    if (apiData.whatsapp)
      socialLinks.push({ platform: "Website", url: apiData.whatsapp });

    return {
      colors,
      fonts,
      socialLinks,
      logo: apiData.companyLogoUrl || apiData.detectedLogoUrl,
    };
  }, []);

  const mapStateToPayload = useCallback(
    (state: BrandKitState): UpdateBrandKitPayload => {
      const payload: UpdateBrandKitPayload = {
        lightPrimary: state.colors.light.primary,
        lightBackground: state.colors.light.background,
        darkPrimary: state.colors.dark.primary,
        darkBackground: state.colors.dark.background,
        accentColor: state.colors.accentColor,
        buttonColor: state.colors.button.color,
        buttonBackgroundColor: state.colors.button.background,
        buttonStrokeColor: state.colors.button.stroke,
        headerFontStyle: state.fonts.header.family,
        headerFontWeight: state.fonts.header.weight,
        bodyFontStyle: state.fonts.body.family,
        bodyFontWeight: state.fonts.body.weight,
      };

      for (const link of state.socialLinks) {
        const apiKey = PLATFORM_TO_API_KEY[link.platform];
        if (apiKey) {
          (payload as any)[apiKey] = link.url;
        }
      }

      return payload;
    },
    [],
  );

  return { mapApiToState, mapStateToPayload };
}
