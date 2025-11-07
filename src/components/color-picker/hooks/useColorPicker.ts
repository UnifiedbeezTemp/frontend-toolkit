import { useState, useRef, useEffect } from "react";

export const useColorPicker = (initialValue: string, onChange: (color: string) => void) => {
  const [hexInput, setHexInput] = useState(initialValue.replace(/^#?/, "#"));
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const saturationRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const presetColors = [
    "#EF4444", "#F97316", "#FACC15", "#4ADE80",
    "#2DD4BF", "#3B82F6", "#6366F1",
  ];

  useEffect(() => {
    setHexInput(initialValue.replace(/^#?/, "#"));
  }, [initialValue]);

  useEffect(() => {
    if (initialValue) {
      const { h, s, l } = hexToHsl(initialValue);
      setHue(h);
      setSaturation(s);
      setLightness(l);
    }
  }, [initialValue]);

  const handlePresetColorClick = (color: string) => {
    const { h, s, l } = hexToHsl(color);
    setHue(h);
    setSaturation(s);
    setLightness(l);
    setHexInput(color);
    onChange(color);
  };

  const handleSaturationLightnessDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = saturationRef.current!.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);

    setSaturation(newSaturation);
    setLightness(newLightness);
    updateColor(hue, newSaturation, newLightness);
  };

  const handleHueDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = hueRef.current!.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newHue = Math.round((x / rect.width) * 360);

    setHue(newHue);
    updateColor(newHue, saturation, lightness);
  };

  const setupDrag = (handler: (e: React.MouseEvent<HTMLDivElement>) => void) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      handler(e);
      const handleMouseMove = (moveEvent: MouseEvent) => {
        handler(moveEvent as unknown as React.MouseEvent<HTMLDivElement>);
      };
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
  };

  const updateColor = (h: number, s: number, l: number) => {
    const newColor = hslToHex(h, s, l);
    setHexInput(newColor);
    onChange(newColor);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHex = e.target.value;
    if (newHex.length > 0 && newHex[0] !== "#") {
      newHex = "#" + newHex;
    }

    setHexInput(newHex);

    if (/^#[0-9A-Fa-f]{6}$/i.test(newHex)) {
      const { h, s, l } = hexToHsl(newHex);
      setHue(h);
      setSaturation(s);
      setLightness(l);
      onChange(newHex);
    }
  };

  const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return {
    hexInput,
    hue,
    saturation,
    lightness,
    saturationRef,
    hueRef,
    presetColors,
    currentColor,
    handlePresetColorClick,
    handleSaturationLightnessDrag,
    handleHueDrag,
    setupDrag,
    handleHexChange,
  };
};