"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useBrandColors } from "./hooks/useBrandColors";
import { useBrandFont } from "./hooks/useBrandFont";
import { useSocialLinks } from "./hooks/useSocialLinks";
import { useCompanyLogo } from "./hooks/useCompanyLogo";
import { useBrandKitMapper } from "./hooks/useBrandKitMapper";
import { useToast } from "../../components/ui/toast/useToast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import {
  BrandKitContextType,
  BrandKitState,
  BrandColorsState,
  BrandFontState,
} from "./types/brandKitTypes";
import {
  ApiBrandKit,
  UpdateBrandKitPayload,
} from "../../types/brandKitApiTypes";
import {
  useBrandKitData,
  useUpdateBrandKit,
  useUploadBrandLogo,
  useDeleteBrandLogo,
  useDetectBrandKit,
} from "../../api/hooks/useBrandKitQueries";

const BrandKitContext = createContext<BrandKitContextType | undefined>(
  undefined,
);

const nonEmptyStringOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export function BrandKitProvider({ children }: { children: ReactNode }) {
  const {
    colors,
    lightHandlers,
    darkHandlers,
    buttonHandlers,
    accentHandlers,
    setColors,
  } = useBrandColors();
  const { fonts, headerHandlers, bodyHandlers, setFonts } = useBrandFont();
  const {
    links,
    handleUpdateLink,
    handleUpdatePlatform,
    handleAddLink,
    handleRemoveLink,
    setLinks,
  } = useSocialLinks();
  const {
    logo,
    pendingLogoFile,
    fileInputRef,
    handleLogoUpload,
    triggerUpload,
    removeLogo,
    setLogo,
    setPendingLogoFile,
  } = useCompanyLogo();

  const { data: brandKitData, isLoading, error, refetch } = useBrandKitData();
  const { mapApiToState, mapStateToPayload } = useBrandKitMapper();
  const { showToast } = useToast();
  const { mutateAsync: updateBrandKitMutation, isPending: isSaving } =
    useUpdateBrandKit();
  const { mutateAsync: uploadLogoMutation, isPending: isUploadingLogo } =
    useUploadBrandLogo();
  const { mutateAsync: deleteLogoMutation, isPending: isDeletingLogo } =
    useDeleteBrandLogo();
  const { mutateAsync: detectBrandMutation, isPending: isDetecting } =
    useDetectBrandKit();

  useEffect(() => {
    if (brandKitData) {
      const mappedState = mapApiToState(brandKitData);
      onImportBrandKit(mappedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandKitData]);

  const hasChanges = React.useMemo(() => {
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
    const initialPayload = brandKitData; // brandKitData is ApiBrandKit

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

      const detectedPrimaryColor = nonEmptyStringOrNull(
        response.detectedPrimaryColor,
      );
      const detectedFaviconUrl = nonEmptyStringOrNull(
        response.detectedFaviconUrl,
      );
      const detectedLogoUrl =
        nonEmptyStringOrNull(response.detectedLogoUrl) ??
        nonEmptyStringOrNull(
          (response as { companyLogoUrl?: unknown }).companyLogoUrl,
        );

      const hasAnyDetectedField = Boolean(
        detectedLogoUrl || detectedPrimaryColor || detectedFaviconUrl,
      );

      if (hasAnyDetectedField) {
        // Map specific detected fields back to our state
        if (detectedLogoUrl) {
          setLogo(detectedLogoUrl);
          setPendingLogoFile(null); // Clear staged if we detect a new one
        }

        if (detectedPrimaryColor) {
          setColors((prev) => ({
            ...prev,
            light: { ...prev.light, primary: detectedPrimaryColor },
            dark: { ...prev.dark, primary: detectedPrimaryColor },
            accentColor: detectedPrimaryColor,
          }));
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

      await refetch();
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
    // 1. If there's a staged file, just clear it locally and revert to previous saved logo
    if (pendingLogoFile) {
      removeLogo();
      // Revert to saved logo if available
      if (brandKitData?.companyLogoUrl) {
        setLogo(brandKitData.companyLogoUrl);
      }
      return;
    }

    // 2. If the current logo in state is different from the saved one (manual change), revert it
    if (logo !== brandKitData?.companyLogoUrl) {
      if (brandKitData?.companyLogoUrl) {
        setLogo(brandKitData.companyLogoUrl);
      } else {
        removeLogo();
      }
      return;
    }

    // 3. Only if it's the actual saved logo, call the DELETE endpoint
    if (logo) {
      try {
        await deleteLogoMutation();
        removeLogo();
        showToast({
          title: "Removed",
          description: "Logo removed",
          variant: "success",
        });
        refetch(); // Sync state
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
      // 1. Handle Logo Upload if staged
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
          return; // Stop if logo upload fails
        }
      }

      // 2. Handle Metadata Update if changed
      const currentState: BrandKitState = {
        colors,
        fonts,
        socialLinks: links,
        logo,
      };
      const payload = mapStateToPayload(currentState);

      // Calculate if metadata has changes using a simplified check
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

  const value: BrandKitContextType = {
    colors,
    fonts,
    socialLinks: links,
    logo,
    isLoading,
    isSaving: isSaving || isUploadingLogo || isDeletingLogo,
    isDeletingLogo,
    isDetecting,
    hasChanges,
    error,
    refetch,
    saveBrandKit,
    detectBrand: handleDetectBrand,
    revertChanges,
    colorHandlers: {
      light: {
        mode: "Light",
        primary: colors.light.primary,
        background: colors.light.background,
        ...lightHandlers,
      },
      dark: {
        mode: "Dark",
        primary: colors.dark.primary,
        background: colors.dark.background,
        ...darkHandlers,
      },
      button: {
        color: colors.button.color,
        background: colors.button.background,
        stroke: colors.button.stroke,
        ...buttonHandlers,
      },
      accent: {
        accentColor: colors.accentColor,
        ...accentHandlers,
      },
    },
    fontHandlers: {
      header: {
        label: "Header Font",
        family: fonts.header.family,
        weight: fonts.header.weight,
        ...headerHandlers,
      },
      body: {
        label: "Body Font",
        family: fonts.body.family,
        weight: fonts.body.weight,
        ...bodyHandlers,
      },
    },
    socialHandlers: {
      onUpdateLink: handleUpdateLink,
      onUpdatePlatform: handleUpdatePlatform,
      onAddLink: handleAddLink,
      onRemoveLink: handleRemoveLink,
    },
    logoHandlers: {
      onUpload: handleLogoUpload,
      onRemove: handleRemoveLogo,
      triggerUpload,
      fileInputRef,
    },
    onImportBrandKit,
  };

  return (
    <BrandKitContext.Provider value={value}>
      {children}
    </BrandKitContext.Provider>
  );
}

export function useBrandKit() {
  const context = useContext(BrandKitContext);
  if (context === undefined) {
    throw new Error("useBrandKit must be used within a BrandKitProvider");
  }
  return context;
}
