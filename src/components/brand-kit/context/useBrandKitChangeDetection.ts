"use client"

import { useMemo } from "react"
import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  SocialLink,
} from "../types/brandKitTypes"
import {
  ApiBrandKit,
  EDITABLE_BRAND_KIT_FIELDS,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes"

interface UseChangeDetectionProps {
  brandKitData?: ApiBrandKit
  colors: BrandColorsState
  fonts: BrandFontState
  links: SocialLink[]
  logo: string | null
  pendingLogoFile: File | null
  mapStateToPayload: (state: BrandKitState) => UpdateBrandKitPayload
}

const normalizeComparableValue = (value: unknown) => {
  if (value == null) return ""
  if (typeof value === "object") return JSON.stringify(value)
  return value.toString().trim()
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
    if (!brandKitData) return false

    // 1. Check for staged logo file
    if (pendingLogoFile) return true

    const currentState: BrandKitState = {
      websiteUrl: brandKitData.websiteUrl ?? "",
      colors,
      fonts,
      socialLinks: links,
      logo,
      readonlyFields: {
        id: brandKitData.id != null ? brandKitData.id.toString() : "",
        companyLogoUrl: brandKitData.companyLogoUrl ?? "",
      },
    }
    const payload = mapStateToPayload(currentState)
    const initialPayload = brandKitData

    return EDITABLE_BRAND_KIT_FIELDS.some((field) => {
      const current = normalizeComparableValue(payload[field])
      const initial = normalizeComparableValue(
        initialPayload[field as keyof ApiBrandKit],
      )
      return current !== initial
    })
  }, [
    brandKitData,
    colors,
    fonts,
    links,
    logo,
    mapStateToPayload,
    pendingLogoFile,
  ])
}
