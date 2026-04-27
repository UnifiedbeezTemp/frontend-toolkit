"use client";

import { useState, useMemo, useCallback } from "react";
import {
  BrandColorsState,
  FontColorState,
} from "../types/brandKitTypes";

export const INITIAL_COLORS: BrandColorsState = {
  light: {
    primary: "#FFFFFF",
    background: "#FFFFFF",
  },
  dark: {
    primary: "#1A1A1A",
    background: "#000000",
  },
  accentColor: "#FFFFFF",
  button: {
    color: "#053d27",
    text: "#FFFFFF",
    stroke: "#053d27",
  },
  font: {
    headingColor: "#1A1A1A",
    bodyColor: "#4A4A4A",
    linkColor: "#4A4A4A",
    mutedColor: "#6E6E6E",
  },
};

export function useBrandColors() {
  const [colors, setColors] = useState<BrandColorsState>(INITIAL_COLORS);

  const handleColorChange = useCallback(
    (
      mode: "light" | "dark",
      field: "primary" | "background",
      color: string,
    ) => {
      setColors((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], [field]: color },
      }));
    },
    [],
  );

  const handleAccentColorChange = useCallback((color: string) => {
    setColors((prev) => ({
      ...prev,
      accentColor: color,
    }));
  }, []);

  const createModeHandlers = useCallback(
    (mode: "light" | "dark") => ({
      onColorChange: (field: "primary" | "background", color: string) =>
        handleColorChange(mode, field, color),
    }),
    [handleColorChange],
  );

  const lightHandlers = useMemo(
    () => createModeHandlers("light"),
    [createModeHandlers],
  );

  const darkHandlers = useMemo(
    () => createModeHandlers("dark"),
    [createModeHandlers],
  );

  const handleButtonColorChange = useCallback(
    (field: "color" | "text" | "stroke", color: string) => {
      setColors((prev) => ({
        ...prev,
        button: { ...prev.button, [field]: color },
      }));
    },
    [],
  );

  const handleFontColorChange = useCallback(
    (field: keyof FontColorState, color: string) => {
      setColors((prev) => ({
        ...prev,
        font: { ...prev.font, [field]: color },
      }));
    },
    [],
  );

  const buttonHandlers = useMemo(
    () => ({
      onColorChange: handleButtonColorChange,
    }),
    [handleButtonColorChange],
  );

  const accentHandlers = useMemo(
    () => ({
      onAccentColorChange: handleAccentColorChange,
    }),
    [handleAccentColorChange],
  );

  const fontColorHandlers = useMemo(
    () => ({
      onColorChange: handleFontColorChange,
    }),
    [handleFontColorChange],
  );

  return {
    colors,
    lightHandlers,
    darkHandlers,
    buttonHandlers,
    accentHandlers,
    fontColorHandlers,
    setColors,
  };
}
