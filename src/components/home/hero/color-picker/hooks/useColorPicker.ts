import { useState, useRef, useCallback } from "react";

const COLORS = [
  "#ff0000",
  "#FF6B00",
  "#FFE600",
  "#24FF00",
  "#00FFF0",
  "#0029FF",
  "#8F00FF",
  "#FF00E5",
] as const;

export const useColorPicker = () => {
  const [color, setColor] = useState("#0029FF");
  const [opacity, setOpacity] = useState(100);
  const colorRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgba = `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, ${opacity / 100})`;

  const pickColor = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!colorRef.current) return;
    const rect = colorRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.round(ratio * (COLORS.length - 1));
    setColor(COLORS[index]);
  }, []);

  const pickOpacity = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!opacityRef.current) return;
    const rect = opacityRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setOpacity(Math.round(ratio * 100));
  }, []);

  const dragColor = useCallback((e: React.MouseEvent<HTMLElement>) => e.buttons === 1 && pickColor(e), [pickColor]);
  const dragOpacity = useCallback((e: React.MouseEvent<HTMLElement>) => e.buttons === 1 && pickOpacity(e), [pickOpacity]);

  return {
    color,
    opacity,
    rgba,
    colorRef,
    opacityRef,
    pickColor,
    pickOpacity,
    dragColor,
    dragOpacity,
    colors: COLORS,
  };
};