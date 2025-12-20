"use client"

import { useColorPicker } from "./hooks/useColorPicker"
import PresetColors from "./PresetColors"
import SaturationLightnessPicker from "./SaturationLightnessPicker"
import HueSlider from "./HueSlider"
import HexInput from "./HexInput"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  onClose?: () => void
}

export default function ColorPicker({ value, onChange, onClose }: ColorPickerProps) {
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
  } = useColorPicker(value, onChange)

  return (
    <div className="p-4">
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
    </div>
  )
}
