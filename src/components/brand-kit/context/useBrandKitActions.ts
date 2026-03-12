import { BrandKitState, BrandColorsState, BrandFontState } from "../types/brandKitTypes";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
} from "../../../types/brandKitApiTypes";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { UseBrandKitActionsProps } from "./contextTypes";

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
  mapApiToState,
  mapStateToPayload,
  showToast,
  refetch,
  updateBrandKitMutation,
  uploadLogoMutation,
  deleteLogoMutation,
  detectBrandMutation,
}: UseBrandKitActionsProps) {
  const onImportBrandKit = (data: Partial<BrandKitState>) => {
    if (data.colors) setColors(data.colors as BrandColorsState);
    if (data.fonts) setFonts(data.fonts as BrandFontState);
    if (data.socialLinks) setLinks(data.socialLinks);
    setLogo(data.logo ?? null);
  };

  const handleDetectBrand = async (websiteUrl: string) => {
    try {
      const response = await detectBrandMutation({ websiteUrl });
      console.log("Detection response:", response);

      if (response.detectedLogoUrl || response.detectedPrimaryColor) {
        if (response.detectedLogoUrl) {
          setLogo(response.detectedLogoUrl);
          setPendingLogoFile(null);
        }

        if (response.detectedPrimaryColor) {
          setColors({
            ...colors,
            light: { ...colors.light, primary: response.detectedPrimaryColor! },
            dark: { ...colors.dark, primary: response.detectedPrimaryColor! },
            accentColor: response.detectedPrimaryColor!,
          });
        }

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
    } catch (err) {
      const msg = extractErrorMessage(err, "Failed to detect brand");
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
