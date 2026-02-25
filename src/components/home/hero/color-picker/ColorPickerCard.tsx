"use client";

import Card from "@/shared/src/components/ui/Card";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { useColorPicker } from "./hooks/useColorPicker";
import ColorPicker from "./ColorPicker";
import TransparencySlider from "./TransparencySlider";
import Checkerboard from "./Checkerboard";

export default function ColorPickerCard() {
  const icons = useSupabaseIcons();
  const {
    color,
    opacity,
    rgba,
    colorRef,
    opacityRef,
    pickColor,
    pickOpacity,
    dragColor,
    dragOpacity,
    colors,
  } = useColorPicker();

  return (
    <Card className="absolute top-[20rem] xl:top-[30rem] right-[-8rem] xl:right-[-10rem] flex-row -translate-x-1/5 flex items-center gap-3 z-10 py-1.5 rounded-2xl shadow-2xl">
      <div className="xl:p-2.5 p-[.5rem] rounded-2xl relative overflow-hidden">
        <Checkerboard />
        <div className="absolute inset-0" style={{ backgroundColor: rgba }} />
        <ImageComponent
          src={icons?.colorPicker ?? ""}
          alt="color picker"
          width={25}
          height={25}
          className="relative z-10"
        />
      </div>

      <div className="flex flex-col gap-[.5rem] xl:gap-4">
        <ColorPicker
          colors={colors}
          selected={color}
          onPick={pickColor}
          onDrag={dragColor}
          pickerRef={colorRef}
        />
        <TransparencySlider
          color={color}
          opacity={opacity}
          onPick={pickOpacity}
          onDrag={dragOpacity}
          sliderRef={opacityRef}
        />
      </div>
    </Card>
  );
}
