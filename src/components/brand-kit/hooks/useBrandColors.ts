"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ModeColorsProps,
  BrandColorsState,
  ButtonColorState,
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
    color: "#FFFFFF",
    background: "#FFFFFF",
    stroke: "#FFFFFF",
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
    (field: "color" | "background" | "stroke", color: string) => {
      setColors((prev) => ({
        ...prev,
        button: { ...prev.button, [field]: color },
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

  return {
    colors,
    lightHandlers,
    darkHandlers,
    buttonHandlers,
    accentHandlers,
    setColors,
  };
}
