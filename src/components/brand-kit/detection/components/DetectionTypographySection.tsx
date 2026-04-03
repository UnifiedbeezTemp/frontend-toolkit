"use client";

import { useSupabaseImages, useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import DetectionSectionCard from "./DetectionSectionCard";
import DetectionFontCard from "./DetectionFontCard";
import type { DetectionTypographySectionProps } from "../types";

export default function DetectionTypographySection({
  fonts,
}: DetectionTypographySectionProps) {
  const images = useSupabaseImages();
  const icons = useSupabaseIcons();

  return (
    <DetectionSectionCard
      title="Typography"
      iconSrc={images.typo}
      iconAlt="Typography"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem]">
        {fonts.map((item, index) => (
          <DetectionFontCard key={item.kind} item={item} delay={index * 0.15} />
        ))}
      </div>
    </DetectionSectionCard>
  );
}
