import { useMemo } from "react"
import type { BrandDetectionResponse } from "../../../../types/brandKitApiTypes"
import { DETECTION_COLOR_FIELDS, DETECTION_SOCIAL_FIELDS } from "../constants"
import { toRgb } from "../utils/color"
import {
  extractFirstFontFamily,
  nonEmptyString,
  normalizeFontWeight,
} from "../utils/string"
import type {
  BrandKitDetectionViewModel,
  DetectionColorItem,
  DetectionFontItem,
  DetectionSocialItem,
} from "../types"

export const useBrandKitDetectionViewModel = (
  data: BrandDetectionResponse | null,
): BrandKitDetectionViewModel => {
  return useMemo(() => {
    const logoUrl =
      nonEmptyString(data?.detectedFaviconUrl) ??
      nonEmptyString(data?.companyLogoUrl) ??
      nonEmptyString(data?.detectedLogoUrl)

    const fonts: DetectionFontItem[] = []
    const headerFontFamily = extractFirstFontFamily(
      nonEmptyString(data?.headerFontStyle),
    )
    const bodyFontFamily = extractFirstFontFamily(
      nonEmptyString(data?.bodyFontStyle),
    )
    const headerFontWeight = normalizeFontWeight(
      nonEmptyString(data?.headerFontWeight),
    )
    const bodyFontWeight = normalizeFontWeight(
      nonEmptyString(data?.bodyFontWeight),
    )

    if (headerFontFamily) {
      fonts.push({
        kind: "header",
        label: "Header font",
        family: headerFontFamily,
        weight: headerFontWeight,
      })
    }

    if (bodyFontFamily) {
      fonts.push({
        kind: "body",
        label: "Body font",
        family: bodyFontFamily,
        weight: bodyFontWeight,
      })
    }

    const colors = DETECTION_COLOR_FIELDS.reduce<DetectionColorItem[]>(
      (acc, field) => {
        const value = nonEmptyString(data ? data[field.key] : null)
        if (!value) return acc

        acc.push({
          id: field.id,
          label: field.label,
          value,
          rgb: toRgb(value),
        })
        return acc
      },
      [],
    )

    const socials = DETECTION_SOCIAL_FIELDS.reduce<DetectionSocialItem[]>(
      (acc, field) => {
        const url = nonEmptyString(data ? data[field.key] : null)
        if (!url) return acc

        acc.push({
          id: field.id,
          label: field.label,
          url,
          iconKey: field.iconKey,
        })
        return acc
      },
      [],
    )

    return {
      logoUrl,
      fonts,
      colors,
      socials,
    }
  }, [data])
}
