"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ModeColorsProps,
  BrandColorsState,
  ButtonColorState,
} from "../types/brandKitTypes";

export interface ModeColorState {
  primary: string;
  background: string;
  accents: string[];
}

export const INITIAL_COLORS: BrandColorsState = {
  light: {
    primary: "#FFFFFF",
    background: "#FFFFFF",
    accents: ["#FFFFFF"],
  },
  dark: {
    primary: "#1A1A1A",
    background: "#000000",
    accents: ["#FFFFFF"],
  },
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

  const handleAccentUpdate = useCallback(
    (mode: "light" | "dark", index: number, color: string) => {
      setColors((prev) => {
        const newAccents = [...prev[mode].accents];
        newAccents[index] = color;
        return {
          ...prev,
          [mode]: { ...prev[mode], accents: newAccents },
        };
      });
    },
    [],
  );

  const handleAddAccent = useCallback((mode: "light" | "dark") => {
    setColors((prev) => {
      if (prev[mode].accents.length >= 5) return prev;
      return {
        ...prev,
        [mode]: {
          ...prev[mode],
          accents: [...prev[mode].accents, "#FFFFFF"],
        },
      };
    });
  }, []);

  const handleRemoveAccent = useCallback(
    (mode: "light" | "dark", index: number) => {
      setColors((prev) => {
        const newAccents = prev[mode].accents.filter((_, i) => i !== index);
        return {
          ...prev,
          [mode]: { ...prev[mode], accents: newAccents },
        };
      });
    },
    [],
  );

  const createModeHandlers = useCallback(
    (mode: "light" | "dark") => ({
      onColorChange: (field: "primary" | "background", color: string) =>
        handleColorChange(mode, field, color),
      onAccentAdd: () => handleAddAccent(mode),
      onAccentUpdate: (index: number, color: string) =>
        handleAccentUpdate(mode, index, color),
      onAccentRemove: (index: number) => handleRemoveAccent(mode, index),
    }),
    [
      handleColorChange,
      handleAddAccent,
      handleAccentUpdate,
      handleRemoveAccent,
    ],
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

  return {
    colors,
    lightHandlers,
    darkHandlers,
    buttonHandlers,
    setColors,
  };
}
