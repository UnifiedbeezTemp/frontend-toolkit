import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  FontWeight,
} from "../types/brandKitTypes"
import {
  ApiBrandKit,
  BrandDetectionResponse,
  EDITABLE_BRAND_KIT_FIELDS,
} from "../../../types/brandKitApiTypes"
import { extractErrorMessage } from "../../../utils/extractErrorMessage"
import { UseBrandKitActionsProps } from "./contextTypes"
import {
  getInvalidTypographyScaleFields,
  getInvalidTypographyScaleMessage,
} from "../utils/typographyScaleValidation"
import {
  getInvalidSocialLinkMessage,
  getInvalidSocialLinks,
} from "../utils/socialLinkValidation"

const nonEmptyStringOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const toFontWeight = (weight: string | null): FontWeight | null => {
  if (!weight) return null
  const trimmed = weight.trim().toLowerCase()
  if (!trimmed) return null

  if (trimmed === "normal" || trimmed === "regular") return "400"
  if (trimmed === "bold") return "700"

  const numeric = Number.parseInt(trimmed, 10)
  if (Number.isFinite(numeric)) {
    if (numeric <= 400) return "400"
    if (numeric <= 500) return "500"
    if (numeric <= 600) return "600"
    return "700"
  }

  if (trimmed.includes("bold")) return "700"
  if (trimmed.includes("light")) return "400"
  return null
}

const extractFirstFontFamily = (value: string | null): string | null => {
  if (!value) return null
  const first = value.split(",")[0]?.trim()
  if (!first) return null
  return first.replace(/^["']|["']$/g, "")
}

const getSavedDisplayLogo = (brandKitData?: ApiBrandKit) =>
  nonEmptyStringOrNull(brandKitData?.detectedFaviconUrl) ??
  nonEmptyStringOrNull(brandKitData?.companyLogoUrl)

const normalizeComparableValue = (value: unknown) => {
  if (value == null) return ""
  if (typeof value === "object") return JSON.stringify(value)
  return value.toString().trim()
}

export function useBrandKitActions({
  colors,
  fonts,
  links,
  logo,
  pendingLogoFile,
  brandKitData,
  websiteUrl,
  readonlyFields,
  setColors,
  setFonts,
  setLinks,
  setLogo,
  setWebsiteUrl,
  setDetectedFaviconUrl,
  setReadonlyFields,
  setPendingLogoFile,
  removeLogo,
  setDetectionOverride,
  mapApiToState,
  mapStateToPayload,
  showToast,
  refetch,
  updateBrandKitMutation,
  uploadLogoMutation,
  deleteLogoMutation,
  detectBrandMutation,
  onDetectionStart,
  onDetectionEvent,
  onDetectionComplete,
  onDetectionError,
}: UseBrandKitActionsProps) {
  const onImportBrandKit = (data: Partial<BrandKitState>) => {
    if (typeof data.websiteUrl === "string") setWebsiteUrl(data.websiteUrl)
    if (data.colors) setColors(data.colors as BrandColorsState)
    if (data.fonts) setFonts(data.fonts as BrandFontState)
    if (data.socialLinks) setLinks(data.socialLinks)
    if (data.readonlyFields) setReadonlyFields(data.readonlyFields)
    setLogo(data.logo ?? null)
  }

  const handleDetectBrand = async (websiteUrl: string) => {
    try {
      setWebsiteUrl(websiteUrl)
      onDetectionStart(websiteUrl)

      const applyDetectionResult = (data: BrandDetectionResponse) => {
        const detectedPrimaryColor = nonEmptyStringOrNull(
          data.detectedPrimaryColor,
        )
        const detectedAccentColor = nonEmptyStringOrNull(
          data.detectedAccentColor,
        )
        const detectedBackgroundColor = nonEmptyStringOrNull(
          data.detectedBackgroundColor,
        )
        const detectedButtonColor = nonEmptyStringOrNull(
          data.detectedButtonColor,
        )

        const detectedLogoUrl =
          nonEmptyStringOrNull(data.detectedFaviconUrl) ??
          nonEmptyStringOrNull(data.companyLogoUrl) ??
          nonEmptyStringOrNull(data.detectedLogoUrl)

        const headerFontFamily = extractFirstFontFamily(
          nonEmptyStringOrNull(data.headerFontStyle),
        )
        const bodyFontFamily = extractFirstFontFamily(
          nonEmptyStringOrNull(data.bodyFontStyle),
        )
        const headerWeight = toFontWeight(
          nonEmptyStringOrNull(data.headerFontWeight),
        )
        const bodyWeight = toFontWeight(
          nonEmptyStringOrNull(data.bodyFontWeight),
        )

        const instagram = nonEmptyStringOrNull(data.instagram)
        const whatsapp = nonEmptyStringOrNull(data.whatsapp)
        const twitter = nonEmptyStringOrNull(data.twitter)
        const facebook = nonEmptyStringOrNull(data.facebook)
        const linkedin = nonEmptyStringOrNull(data.linkedin)
        const youtube = nonEmptyStringOrNull(data.youtube)

        if (detectedLogoUrl) {
          setDetectedFaviconUrl(detectedLogoUrl)
          setLogo(detectedLogoUrl)
          setPendingLogoFile(null)
        }

        if (
          detectedPrimaryColor ||
          detectedAccentColor ||
          detectedBackgroundColor ||
          detectedButtonColor
        ) {
          setColors((prev) => ({
            ...prev,
            light: {
              ...prev.light,
              primary: detectedPrimaryColor ?? prev.light.primary,
              background: detectedBackgroundColor ?? prev.light.background,
            },
            dark: {
              ...prev.dark,
              primary: detectedPrimaryColor ?? prev.dark.primary,
            },
            accentColor:
              detectedAccentColor ?? detectedPrimaryColor ?? prev.accentColor,
            button: {
              ...prev.button,
              color: detectedButtonColor ?? prev.button.color,
            },
          }))
        }

        if (headerFontFamily || headerWeight || bodyFontFamily || bodyWeight) {
          setFonts((prev) => ({
            ...prev,
            header: {
              ...prev.header,
              family: headerFontFamily ?? prev.header.family,
              weight: headerWeight ?? prev.header.weight,
            },
            body: {
              ...prev.body,
              family: bodyFontFamily ?? prev.body.family,
              weight: bodyWeight ?? prev.body.weight,
            },
          }))
        }

        if (
          instagram ||
          whatsapp ||
          twitter ||
          facebook ||
          linkedin ||
          youtube
        ) {
          setLinks((prev) =>
            prev.map((link) => {
              switch (link.platform) {
                case "Instagram":
                  return { ...link, url: instagram ?? link.url }
                case "WhatsApp":
                  return { ...link, url: whatsapp ?? link.url }
                case "X":
                  return { ...link, url: twitter ?? link.url }
                case "YouTube":
                  return { ...link, url: youtube ?? link.url }
                case "Facebook":
                  return { ...link, url: facebook ?? link.url }
                case "LinkedIn":
                  return { ...link, url: linkedin ?? link.url }
                default:
                  return link
              }
            }),
          )
        }

        setDetectionOverride({
          logoUrl: detectedLogoUrl ?? undefined,
          primaryColor: detectedPrimaryColor ?? undefined,
        })
      }

      const response = await detectBrandMutation({
        websiteUrl,
        onEvent: ({ event, data }) => {
          onDetectionEvent({ event, data })
          // console.log(`[brand-kit/detect] ${event}`, {
          //   ...data,
          //   _meta: {
          //     accuracyScore: data.accuracyScore,
          //     advancedSearchTriggered: data.advancedSearchTriggered,
          //   },
          // });
          applyDetectionResult(data)
        },
      })

      // console.log("[brand-kit/detect] complete response", response);
      onDetectionComplete(response)
      applyDetectionResult(response)

      const hasAnyDetectedField = Boolean(
        nonEmptyStringOrNull(response.detectedFaviconUrl) ||
        nonEmptyStringOrNull(response.companyLogoUrl) ||
        nonEmptyStringOrNull(response.detectedPrimaryColor) ||
        nonEmptyStringOrNull(response.detectedAccentColor) ||
        nonEmptyStringOrNull(response.detectedBackgroundColor) ||
        nonEmptyStringOrNull(response.detectedButtonColor) ||
        nonEmptyStringOrNull(response.headerFontStyle) ||
        nonEmptyStringOrNull(response.bodyFontStyle) ||
        nonEmptyStringOrNull(response.instagram) ||
        nonEmptyStringOrNull(response.whatsapp) ||
        nonEmptyStringOrNull(response.twitter) ||
        nonEmptyStringOrNull(response.facebook) ||
        nonEmptyStringOrNull(response.linkedin) ||
        nonEmptyStringOrNull(response.youtube),
      )

      if (hasAnyDetectedField) {
        showToast({
          title: "Imported",
          description: "Brand elements detected from website",
          variant: "success",
        })
      } else {
        showToast({
          title: "Detection Results",
          description:
            "No clear brand elements were detected, but you can still set them manually.",
          variant: "info",
        })
      }

      await refetch()
    } catch (err) {
      const msg = extractErrorMessage(err, "Failed to detect brand")
      onDetectionError(msg)
      showToast({
        title: "Error",
        description: msg,
        variant: "error",
      })
    }
  }

  const revertChanges = () => {
    if (brandKitData) {
      const mappedState = mapApiToState(brandKitData)
      onImportBrandKit(mappedState)
      setPendingLogoFile(null)
      showToast({
        title: "Reverted",
        description: "All changes have been reverted",
        variant: "info",
      })
    }
  }

  const handleRemoveLogo = async () => {
    if (pendingLogoFile) {
      removeLogo()
      const savedLogo = getSavedDisplayLogo(brandKitData)
      if (savedLogo) {
        setLogo(savedLogo)
      }
      return
    }

    const savedLogo = getSavedDisplayLogo(brandKitData)

    if (logo !== savedLogo) {
      if (savedLogo) {
        setLogo(savedLogo)
      } else {
        removeLogo()
      }
      return
    }

    if (logo) {
      try {
        await deleteLogoMutation()
        removeLogo()
        showToast({
          title: "Removed",
          description: "Logo removed",
          variant: "success",
        })
        refetch()
      } catch (err) {
        const msg = extractErrorMessage(err, "Failed to remove logo")
        showToast({
          title: "Error",
          description: msg,
          variant: "error",
        })
      }
    }
  }

  const saveBrandKit = async () => {
    try {
      const invalidTypographyScaleFields = getInvalidTypographyScaleFields(
        fonts.scale,
      )
      const invalidSocialLinks = getInvalidSocialLinks(links)
      const hasInvalidTypographyScaleFields =
        invalidTypographyScaleFields.length > 0
      const hasInvalidSocialLinks = invalidSocialLinks.length > 0

      if (hasInvalidTypographyScaleFields || hasInvalidSocialLinks) {
        showToast({
          title:
            hasInvalidTypographyScaleFields && hasInvalidSocialLinks
              ? "Invalid Brand Kit Fields"
              : hasInvalidTypographyScaleFields
                ? "Invalid Typography Scale"
                : "Invalid Social Links",
          description: [
            hasInvalidTypographyScaleFields
              ? `${getInvalidTypographyScaleMessage(invalidTypographyScaleFields)} Use valid CSS font sizes before saving.`
              : "",
            hasInvalidSocialLinks
              ? `${getInvalidSocialLinkMessage(invalidSocialLinks)} Use valid social links before saving.`
              : "",
          ]
            .filter(Boolean)
            .join(" "),
          variant: "error",
        })
        return
      }

      if (pendingLogoFile) {
        try {
          await uploadLogoMutation(pendingLogoFile)
          showToast({
            title: "Success",
            description: "Logo uploaded successfully",
            variant: "success",
          })
          setPendingLogoFile(null)
        } catch (logoErr) {
          const logoMsg = extractErrorMessage(logoErr, "Failed to upload logo")
          showToast({
            title: "Error",
            description: logoMsg,
            variant: "error",
          })
          return
        }
      }

      const currentState: BrandKitState = {
        websiteUrl,
        colors,
        fonts,
        socialLinks: links,
        logo,
        readonlyFields,
      }
      const payload = mapStateToPayload(currentState)

      const hasMetadataChanges = EDITABLE_BRAND_KIT_FIELDS.some((field) => {
        const current = normalizeComparableValue(payload[field])
        const initial = normalizeComparableValue(
          brandKitData?.[field as keyof ApiBrandKit],
        )
        return current !== initial
      })

      if (hasMetadataChanges) {
        await updateBrandKitMutation(payload)
        showToast({
          title: "Success",
          description: "Brand kit metadata updated successfully",
          variant: "success",
        })
      }

      refetch()
    } catch (err) {
      const errorMessage = extractErrorMessage(
        err,
        "Failed to update brand kit",
      )
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "error",
      })
    }
  }

  return {
    onImportBrandKit,
    handleDetectBrand,
    revertChanges,
    handleRemoveLogo,
    saveBrandKit,
  }
}
