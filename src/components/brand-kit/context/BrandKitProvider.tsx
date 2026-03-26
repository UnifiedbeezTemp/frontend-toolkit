"use client";

import React, { ReactNode, useEffect } from "react";
import { useBrandColors } from "../hooks/useBrandColors";
import { useBrandFont } from "../hooks/useBrandFont";
import { useSocialLinks } from "../hooks/useSocialLinks";
import { useCompanyLogo } from "../hooks/useCompanyLogo";
import { useBrandKitMapper } from "../hooks/useBrandKitMapper";
import { useToast } from "../../../components/ui/toast/useToast";
import type { BrandKitContextType } from "../types/brandKitTypes";
import {
  useBrandKitData,
  useUpdateBrandKit,
  useUploadBrandLogo,
  useDeleteBrandLogo,
  useDetectBrandKit,
} from "../../../api/hooks/useBrandKitQueries";
import { BrandKitContext } from "./BrandKitContext";
import { useBrandKitActions } from "./useBrandKitActions";
import { useBrandKitChangeDetection } from "./useBrandKitChangeDetection";
import { BrandDetectionOverride } from "./contextTypes";

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

  const detectionOverrideRef = React.useRef<BrandDetectionOverride | null>(null);
  const setDetectionOverride = React.useCallback(
    (override: BrandDetectionOverride | null) => {
      detectionOverrideRef.current = override;
    },
    [],
  );

  const { mutateAsync: updateBrandKitMutation, isPending: isSaving } =
    useUpdateBrandKit();
  const { mutateAsync: uploadLogoMutation, isPending: isUploadingLogo } =
    useUploadBrandLogo();
  const { mutateAsync: deleteLogoMutation, isPending: isDeletingLogo } =
    useDeleteBrandLogo();
  const { mutateAsync: detectBrandMutation, isPending: isDetecting } =
    useDetectBrandKit();

  const {
    onImportBrandKit,
    handleDetectBrand,
    revertChanges,
    handleRemoveLogo,
    saveBrandKit,
  } = useBrandKitActions({
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
    setDetectionOverride,
  });

  const hasChanges = useBrandKitChangeDetection({
    brandKitData,
    colors,
    fonts,
    links,
    logo,
    pendingLogoFile,
    mapStateToPayload,
  });

  useEffect(() => {
    if (brandKitData) {
      const mappedState = mapApiToState(brandKitData);
      const override = detectionOverrideRef.current;
      if (override) {
        detectionOverrideRef.current = null;

        if (override.logoUrl) {
          mappedState.logo = override.logoUrl;
        }

        if (override.primaryColor) {
          mappedState.colors = {
            ...mappedState.colors,
            light: { ...mappedState.colors.light, primary: override.primaryColor },
            dark: { ...mappedState.colors.dark, primary: override.primaryColor },
            accentColor: override.primaryColor,
          };
        }
      }
      onImportBrandKit(mappedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandKitData]);

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
