import { useState, useMemo, useCallback } from "react";
import { FontState, BrandFontState } from "../types/brandKitTypes";

export const INITIAL_FONTS: BrandFontState = {
  header: {
    family: "Times New Roman",
    weight: "Bold",
    style: "Normal",
  },
  body: {
    family: "Times New Roman",
    weight: "Regular",
    style: "Normal",
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

  return {
    fonts,
    headerHandlers,
    bodyHandlers,
    setFonts,
  };
}
