import { useCallback } from "react"
import {
  ApiBrandKit,
  ApiFontColors,
  ApiTypographyScale,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes"
import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  BrandKitReadonlyState,
  SocialLink,
  SocialPlatform,
} from "../types/brandKitTypes"
import { INITIAL_COLORS } from "./useBrandColors"
import { INITIAL_FONTS } from "./useBrandFont"
import { INITIAL_SOCIAL_LINKS } from "./useSocialLinks"

type SocialPayloadKey =
  | "instagram"
  | "whatsapp"
  | "twitter"
  | "youtube"
  | "facebook"
  | "linkedin"

const PLATFORM_TO_API_KEY: Record<SocialPlatform, SocialPayloadKey> = {
  Instagram: "instagram",
  WhatsApp: "whatsapp",
  X: "twitter",
  YouTube: "youtube",
  Facebook: "facebook",
  LinkedIn: "linkedin",
}

const normalizeFontWeight = (weight: string | null | undefined) => {
  const trimmed = `${weight ?? ""}`.trim()
  const numeric = Number.parseInt(trimmed, 10)

  if (Number.isFinite(numeric)) {
    if (numeric <= 400) return "400"
    if (numeric <= 500) return "500"
    if (numeric <= 600) return "600"
    return "700"
  }

  const lower = trimmed.toLowerCase()
  if (lower.includes("bold")) return "700"
  return "400"
}

const nonEmptyString = (value: string | null | undefined, fallback = "") =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback

const nullableString = (value: string) => {
  const trimmed = value?.trim()
  return trimmed?.length > 0 ? trimmed : null
}

const normalizeSocialLinks = (apiData: ApiBrandKit): SocialLink[] =>
  INITIAL_SOCIAL_LINKS.map((link) => {
    const apiKey = PLATFORM_TO_API_KEY[link.platform]
    return {
      platform: link.platform,
      url: nonEmptyString(apiData[apiKey] as string | null | undefined),
    }
  })

export function useBrandKitMapper() {
  const mapApiToState = useCallback((apiData: ApiBrandKit): BrandKitState => {
    const colors: BrandColorsState = {
      light: {
        primary: nonEmptyString(
          apiData.lightPrimary,
          INITIAL_COLORS.light.primary,
        ),
        background: nonEmptyString(
          apiData.lightBackground,
          INITIAL_COLORS.light.background,
        ),
      },
      dark: {
        primary: nonEmptyString(
          apiData.darkPrimary,
          INITIAL_COLORS.dark.primary,
        ),
        background: nonEmptyString(
          apiData.darkBackground,
          INITIAL_COLORS.dark.background,
        ),
      },
      accentColor: nonEmptyString(
        apiData.accentColor,
        INITIAL_COLORS.accentColor,
      ),
      button: {
        color: nonEmptyString(apiData.buttonColor, INITIAL_COLORS.button.color),
        text: nonEmptyString(
          apiData.buttonTextColor,
          INITIAL_COLORS.button.text,
        ),
        stroke: nonEmptyString(
          apiData.buttonStrokeColor,
          INITIAL_COLORS.button.stroke,
        ),
      },
      font: {
        headingColor: nonEmptyString(
          apiData.fontColors?.headingColor,
          INITIAL_COLORS.font.headingColor,
        ),
        bodyColor: nonEmptyString(
          apiData.fontColors?.bodyColor,
          INITIAL_COLORS.font.bodyColor,
        ),
        linkColor: nonEmptyString(
          apiData.fontColors?.linkColor,
          INITIAL_COLORS.font.linkColor,
        ),
        mutedColor: nonEmptyString(
          apiData.fontColors?.mutedColor,
          INITIAL_COLORS.font.mutedColor,
        ),
      },
    }

    const fonts: BrandFontState = {
      header: {
        family: nonEmptyString(
          apiData.headerFontStyle,
          INITIAL_FONTS.header.family,
        ),
        weight: normalizeFontWeight(apiData.headerFontWeight),
        style: "Normal",
      },
      body: {
        family: nonEmptyString(
          apiData.bodyFontStyle,
          INITIAL_FONTS.body.family,
        ),
        weight: normalizeFontWeight(apiData.bodyFontWeight),
        style: "Normal",
      },
      scale: {
        h1: nonEmptyString(apiData.typographyScale?.h1, INITIAL_FONTS.scale.h1),
        h2: nonEmptyString(apiData.typographyScale?.h2, INITIAL_FONTS.scale.h2),
        h3: nonEmptyString(apiData.typographyScale?.h3, INITIAL_FONTS.scale.h3),
        body: nonEmptyString(
          apiData.typographyScale?.body,
          INITIAL_FONTS.scale.body,
        ),
      },
    }

    const readonlyFields: BrandKitReadonlyState = {
      id: apiData.id != null ? apiData.id.toString() : "",
      companyLogoUrl: nonEmptyString(apiData.companyLogoUrl),
    }

    return {
      websiteUrl: nonEmptyString(apiData.websiteUrl),
      colors,
      fonts,
      socialLinks: normalizeSocialLinks(apiData),
      logo:
        nonEmptyString(apiData.detectedFaviconUrl) ||
        nonEmptyString(apiData.companyLogoUrl) ||
        null,
      readonlyFields,
    }
  }, [])

  const mapStateToPayload = useCallback(
    (state: BrandKitState): UpdateBrandKitPayload => {
      const socialDefaults = Object.values(PLATFORM_TO_API_KEY).reduce(
        (acc, key) => ({ ...acc, [key]: null }),
        {} as Record<string, null>,
      )

      const payload: UpdateBrandKitPayload = {
        fontColors: {
          headingColor: nullableString(state.colors.font.headingColor),
          bodyColor: nullableString(state.colors.font.bodyColor),
          linkColor: nullableString(state.colors.font.linkColor),
          mutedColor: nullableString(state.colors.font.mutedColor),
        } as ApiFontColors,
        typographyScale: {
          h1: nullableString(state.fonts.scale.h1),
          h2: nullableString(state.fonts.scale.h2),
          h3: nullableString(state.fonts.scale.h3),
          body: nullableString(state.fonts.scale.body),
        } as ApiTypographyScale,
        lightPrimary: state.colors.light.primary,
        lightBackground: state.colors.light.background,
        darkPrimary: state.colors.dark.primary,
        darkBackground: state.colors.dark.background,
        accentColor: state.colors.accentColor,
        buttonColor: state.colors.button.color,
        buttonTextColor: nullableString(state.colors.button.text),
        buttonStrokeColor: state.colors.button.stroke,
        headerFontStyle: state.fonts.header.family,
        headerFontWeight: state.fonts.header.weight,
        bodyFontStyle: state.fonts.body.family,
        bodyFontWeight: state.fonts.body.weight,
        ...socialDefaults,
      }

      for (const link of state.socialLinks) {
        const apiKey = PLATFORM_TO_API_KEY[link.platform]
        if (apiKey) {
          payload[apiKey] = nullableString(link.url)
        }
      }

      return payload
    },
    [],
  )

  return { mapApiToState, mapStateToPayload }
}
