"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useBrandColors } from "./hooks/useBrandColors";
import { useBrandFont } from "./hooks/useBrandFont";
import { useSocialLinks } from "./hooks/useSocialLinks";
import { useCompanyLogo } from "./hooks/useCompanyLogo";
import {
  BrandKitContextType,
  BrandKitState,
  BrandColorsState,
  BrandFontState,
} from "./types/brandKitTypes";

const BrandKitContext = createContext<BrandKitContextType | undefined>(
  undefined,
);

export function BrandKitProvider({ children }: { children: ReactNode }) {
  const { colors, lightHandlers, darkHandlers, buttonHandlers, setColors } =
    useBrandColors();
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
    fileInputRef,
    handleLogoUpload,
    triggerUpload,
    removeLogo,
    setLogo,
  } = useCompanyLogo();

  const value: BrandKitContextType = {
    colors,
    fonts,
    socialLinks: links,
    logo,
    colorHandlers: {
      light: {
        mode: "Light",
        primary: colors.light.primary,
        background: colors.light.background,
        accents: colors.light.accents,
        ...lightHandlers,
      },
      dark: {
        mode: "Dark",
        primary: colors.dark.primary,
        background: colors.dark.background,
        accents: colors.dark.accents,
        ...darkHandlers,
      },
      button: {
        color: colors.button.color,
        background: colors.button.background,
        stroke: colors.button.stroke,
        ...buttonHandlers,
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
      onRemove: removeLogo,
      triggerUpload,
      fileInputRef,
    },
    onImportBrandKit: (data: Partial<BrandKitState>) => {
      if (data.colors) setColors(data.colors as BrandColorsState);
      if (data.fonts) setFonts(data.fonts as BrandFontState);
      if (data.socialLinks) setLinks(data.socialLinks);
      if (data.logo) setLogo(data.logo);
    },
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
