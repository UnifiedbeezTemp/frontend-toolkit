import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  FontWeight,
  SocialLink,
} from "../types/brandKitTypes";
import {
  ApiBrandKit,
  BrandDetectionResponse,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { UseBrandKitActionsProps } from "./contextTypes";

const nonEmptyStringOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const toFontWeight = (weight: string | null): FontWeight | null => {
  if (!weight) return null;
  const trimmed = weight.trim().toLowerCase();
  if (!trimmed) return null;

  if (trimmed === "normal" || trimmed === "regular") return "400";
  if (trimmed === "bold") return "700";

  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isFinite(numeric)) {
    if (numeric <= 400) return "400";
    if (numeric <= 500) return "500";
    if (numeric <= 600) return "600";
    return "700";
  }

  if (trimmed.includes("bold")) return "700";
  if (trimmed.includes("light")) return "400";
  return null;
};

const extractFirstFontFamily = (value: string | null): string | null => {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  if (!first) return null;
  return first.replace(/^["']|["']$/g, "");
};

export function useBrandKitActions({
  colors,
  fonts,
  links,
  logo,
  pendingLogoFile,
  brandKitData,
  setColors,
  setFonts,
  setLinks,
  setLogo,
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
    if (data.colors) setColors(data.colors as BrandColorsState);
    if (data.fonts) setFonts(data.fonts as BrandFontState);
    if (data.socialLinks) setLinks(data.socialLinks);
    setLogo(data.logo ?? null);
  };

  const handleDetectBrand = async (websiteUrl: string) => {
    try {
      onDetectionStart(websiteUrl);

      const applyDetectionResult = (data: BrandDetectionResponse) => {
        const detectedPrimaryColor = nonEmptyStringOrNull(
          data.detectedPrimaryColor,
        );
        const detectedAccentColor = nonEmptyStringOrNull(
          data.detectedAccentColor,
        );
        const detectedBackgroundColor = nonEmptyStringOrNull(
          data.detectedBackgroundColor,
        );
        const detectedButtonColor = nonEmptyStringOrNull(
          data.detectedButtonColor,
        );

        const detectedLogoUrl =
          nonEmptyStringOrNull(data.companyLogoUrl) ??
          nonEmptyStringOrNull(data.detectedLogoUrl);

        const headerFontFamily = extractFirstFontFamily(
          nonEmptyStringOrNull(data.headerFontStyle),
        );
        const bodyFontFamily = extractFirstFontFamily(
          nonEmptyStringOrNull(data.bodyFontStyle),
        );
        const headerWeight = toFontWeight(
          nonEmptyStringOrNull(data.headerFontWeight),
        );
        const bodyWeight = toFontWeight(
          nonEmptyStringOrNull(data.bodyFontWeight),
        );

        const socialLinks: SocialLink[] = [];
        const instagram = nonEmptyStringOrNull(data.instagram);
        const twitter = nonEmptyStringOrNull(data.twitter);
        const facebook = nonEmptyStringOrNull(data.facebook);
        const linkedin = nonEmptyStringOrNull(data.linkedin);
        const youtube = nonEmptyStringOrNull(data.youtube);
        if (instagram) socialLinks.push({ platform: "Instagram", url: instagram });
        if (facebook) socialLinks.push({ platform: "Facebook", url: facebook });
        if (twitter) socialLinks.push({ platform: "X", url: twitter });
        if (linkedin) socialLinks.push({ platform: "LinkedIn", url: linkedin });
        if (youtube) socialLinks.push({ platform: "YouTube", url: youtube });

        if (detectedLogoUrl) {
          setLogo(detectedLogoUrl);
          setPendingLogoFile(null);
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
              background: detectedButtonColor ?? prev.button.background,
            },
          }));
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
          }));
        }

        if (socialLinks.length > 0) {
          setLinks(socialLinks);
        }

        setDetectionOverride({
          logoUrl: detectedLogoUrl ?? undefined,
          primaryColor: detectedPrimaryColor ?? undefined,
        });
      };

      const response = await detectBrandMutation({
        websiteUrl,
        onEvent: ({ event, data }) => {
          onDetectionEvent({ event, data });
          // console.log(`[brand-kit/detect] ${event}`, {
          //   ...data,
          //   _meta: {
          //     accuracyScore: data.accuracyScore,
          //     advancedSearchTriggered: data.advancedSearchTriggered,
          //   },
          // });
          applyDetectionResult(data);
        },
      });

      // console.log("[brand-kit/detect] complete response", response);
      onDetectionComplete(response);
      applyDetectionResult(response);

      const hasAnyDetectedField = Boolean(
        nonEmptyStringOrNull(response.companyLogoUrl) ||
          nonEmptyStringOrNull(response.detectedPrimaryColor) ||
          nonEmptyStringOrNull(response.detectedAccentColor) ||
          nonEmptyStringOrNull(response.detectedBackgroundColor) ||
          nonEmptyStringOrNull(response.detectedButtonColor) ||
          nonEmptyStringOrNull(response.headerFontStyle) ||
          nonEmptyStringOrNull(response.bodyFontStyle) ||
          nonEmptyStringOrNull(response.instagram) ||
          nonEmptyStringOrNull(response.twitter) ||
          nonEmptyStringOrNull(response.facebook) ||
          nonEmptyStringOrNull(response.linkedin) ||
          nonEmptyStringOrNull(response.youtube),
      );

      if (hasAnyDetectedField) {
        showToast({
          title: "Imported",
          description: "Brand elements detected from website",
          variant: "success",
        });
      } else {
        showToast({
          title: "Detection Results",
          description:
            "No clear brand elements were detected, but you can still set them manually.",
          variant: "info",
        });
      }

      await refetch();
    } catch (err) {
      const msg = extractErrorMessage(err, "Failed to detect brand");
      onDetectionError(msg);
      showToast({
        title: "Error",
        description: msg,
        variant: "error",
      });
    }
  };

  const revertChanges = () => {
    if (brandKitData) {
      const mappedState = mapApiToState(brandKitData);
      onImportBrandKit(mappedState);
      setPendingLogoFile(null);
      showToast({
        title: "Reverted",
        description: "All changes have been reverted",
        variant: "info",
      });
    }
  };

  const handleRemoveLogo = async () => {
    if (pendingLogoFile) {
      removeLogo();
      if (brandKitData?.companyLogoUrl) {
        setLogo(brandKitData.companyLogoUrl);
      }
      return;
    }

    if (logo !== brandKitData?.companyLogoUrl) {
      if (brandKitData?.companyLogoUrl) {
        setLogo(brandKitData.companyLogoUrl);
      } else {
        removeLogo();
      }
      return;
    }

    if (logo) {
      try {
        await deleteLogoMutation();
        removeLogo();
        showToast({
          title: "Removed",
          description: "Logo removed",
          variant: "success",
        });
        refetch();
      } catch (err) {
        const msg = extractErrorMessage(err, "Failed to remove logo");
        showToast({
          title: "Error",
          description: msg,
          variant: "error",
        });
      }
    }
  };

  const saveBrandKit = async () => {
    try {
      if (pendingLogoFile) {
        try {
          await uploadLogoMutation(pendingLogoFile);
          showToast({
            title: "Success",
            description: "Logo uploaded successfully",
            variant: "success",
          });
          setPendingLogoFile(null);
        } catch (logoErr) {
          const logoMsg = extractErrorMessage(logoErr, "Failed to upload logo");
          showToast({
            title: "Error",
            description: logoMsg,
            variant: "error",
          });
          return;
        }
      }

      const currentState: BrandKitState = {
        colors,
        fonts,
        socialLinks: links,
        logo,
      };
      const payload = mapStateToPayload(currentState);

      const metadataFields: (keyof UpdateBrandKitPayload)[] = [
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

      const hasMetadataChanges = metadataFields.some((field) => {
        const current = (payload[field] ?? "").toString().toLowerCase().trim();
        const initial = (brandKitData?.[field as keyof ApiBrandKit] ?? "")
          .toString()
          .toLowerCase()
          .trim();
        return current !== initial;
      });

      if (hasMetadataChanges) {
        await updateBrandKitMutation(payload);
        showToast({
          title: "Success",
          description: "Brand kit metadata updated successfully",
          variant: "success",
        });
      }

      refetch();
    } catch (err) {
      const errorMessage = extractErrorMessage(
        err,
        "Failed to update brand kit",
      );
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return {
    onImportBrandKit,
    handleDetectBrand,
    revertChanges,
    handleRemoveLogo,
    saveBrandKit,
  };
}
