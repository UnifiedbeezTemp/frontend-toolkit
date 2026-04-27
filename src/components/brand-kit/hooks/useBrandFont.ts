import { useState, useMemo, useCallback } from "react";
import {
  FontState,
  BrandFontState,
  TypographyScaleState,
} from "../types/brandKitTypes";

export const INITIAL_FONTS: BrandFontState = {
  header: {
    family: "Times New Roman",
    weight: "700",
    style: "Normal",
  },
  body: {
    family: "Times New Roman",
    weight: "400",
    style: "Normal",
  },
  scale: {
    h1: "72px",
    h2: "48px",
    h3: "20px",
    body: "16px",
  },
};

export function useBrandFont() {
  const [fonts, setFonts] = useState<BrandFontState>(INITIAL_FONTS);

  const handleFontChange = useCallback(
    (type: "header" | "body", field: keyof FontState, value: string) => {
      setFonts((prev: BrandFontState) => ({
        ...prev,
        [type]: { ...prev[type], [field]: value },
      }));
    },
    [],
  );

  const headerHandlers = useMemo(
    () => ({
      onFamilyChange: (value: string) =>
        handleFontChange("header", "family", value),
      onWeightChange: (value: string) =>
        handleFontChange("header", "weight", value),
    }),
    [handleFontChange],
  );

  const bodyHandlers = useMemo(
    () => ({
      onFamilyChange: (value: string) =>
        handleFontChange("body", "family", value),
      onWeightChange: (value: string) =>
        handleFontChange("body", "weight", value),
    }),
    [handleFontChange],
  );

  const handleScaleChange = useCallback(
    (field: keyof TypographyScaleState, value: string) => {
      setFonts((prev) => ({
        ...prev,
        scale: { ...prev.scale, [field]: value },
      }));
    },
    [],
  );

  const scaleHandlers = useMemo(
    () => ({
      values: fonts.scale,
      onScaleChange: handleScaleChange,
    }),
    [fonts.scale, handleScaleChange],
  );

  return {
    fonts,
    headerHandlers,
    bodyHandlers,
    scaleHandlers,
    setFonts,
  };
}
