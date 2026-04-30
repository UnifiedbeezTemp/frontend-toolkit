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
  DetectionColorId,
  DetectionColorItem,
  DetectionFontItem,
  DetectionScaleItem,
  DetectionSocialItem,
} from "../types"

export const useBrandKitDetectionViewModel = (
  data: BrandDetectionResponse | null,
): BrandKitDetectionViewModel => {
  return useMemo(() => {
    const logoUrl =
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

    const scale: DetectionScaleItem[] = []
    if (data?.typographyScale) {
      const s = data.typographyScale
      if (s.h1) scale.push({ id: "h1", label: "Heading 1", value: s.h1 })
      if (s.h2) scale.push({ id: "h2", label: "Heading 2", value: s.h2 })
      if (s.h3) scale.push({ id: "h3", label: "Heading 3", value: s.h3 })
      if (s.body) scale.push({ id: "body", label: "Body text", value: s.body })
    }

    const colors: DetectionColorItem[] = []

    // Map main colors
    DETECTION_COLOR_FIELDS.forEach((field) => {
      const value = nonEmptyString(data ? (data)[field.key] : null)
      if (value) {
        colors.push({
          id: field.id,
          label: field.label,
          value,
          rgb: toRgb(value),
        })
      }
    })

    // Map button text color
    const buttonText = nonEmptyString(data?.buttonTextColor)
    if (buttonText) {
      colors.push({
        id: "buttonText",
        label: "Button text",
        value: buttonText,
        rgb: toRgb(buttonText),
      })
    }

    // Map font colors
    if (data?.fontColors) {
      const fc = data.fontColors
      const mappings: { key: keyof typeof fc; id: DetectionColorId; label: string }[] = [
        { key: "headingColor", id: "heading", label: "Heading color" },
        { key: "bodyColor", id: "bodyText", label: "Body text color" },
        { key: "linkColor", id: "link", label: "Link color" },
        { key: "mutedColor", id: "muted", label: "Muted color" },
      ]

      mappings.forEach((m) => {
        const val = nonEmptyString(fc[m.key])
        if (val) {
          colors.push({
            id: m.id,
            label: m.label,
            value: val,
            rgb: toRgb(val),
          })
        }
      })
    }

    const socials = DETECTION_SOCIAL_FIELDS.reduce<DetectionSocialItem[]>(
      (acc, field) => {
        const url = nonEmptyString(data ? (data)[field.key] : null)
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
      scale,
      colors,
      socials,
    }
  }, [data])
}
