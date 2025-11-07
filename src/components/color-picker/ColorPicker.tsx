"use client";

import { motion } from "framer-motion";
import { useColorPicker } from "./hooks/useColorPicker";
import PresetColors from "./PresetColors";
import SaturationLightnessPicker from "./SaturationLightnessPicker";
import HueSlider from "./HueSlider";
import { useEffect, useRef } from "react";
import HexInput from "./HexInput";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export default function ColorPicker({ value, onChange, onClose }: ColorPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const {
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
  } = useColorPicker(value, onChange);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={pickerRef}
      className="absolute top-full left-0 mt-2 bg-primary border border-border rounded-lg shadow-xl z-10 p-4 w-[300px] backdrop-blur-sm"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
    >
      <div className="mb-4 border-b border-border pb-[10px]">
        <PresetColors colors={presetColors} onClick={handlePresetColorClick} />
      </div>

      <div className="mb-[10px]">
        <label className="text-text-secondary text-[12px] font-[700] mb-[5px] block">
          Custom color
        </label>
        <HexInput
          value={hexInput.replace(/^#/, "")}
          currentColor={currentColor}
          onChange={handleHexChange}
        />
      </div>

      <div className="mb-4">
        <SaturationLightnessPicker
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          currentColor={currentColor}
          saturationRef={saturationRef}
          onMouseDown={setupDrag(handleSaturationLightnessDrag)}
        />
      </div>

      <div>
        <HueSlider
          hue={hue}
          hueRef={hueRef}
          onMouseDown={setupDrag(handleHueDrag)}
        />
      </div>
    </motion.div>
  );
}