"use client";

import DetectionColorsSection from "./DetectionColorsSection";
import DetectionEmptySection from "./DetectionEmptySection";
import DetectionLogoSection from "./DetectionLogoSection";
import DetectionSocialsSection from "./DetectionSocialsSection";
import DetectionTypographySection from "./DetectionTypographySection";
import type { DetectionSectionRendererProps } from "../types";

export default function DetectionSectionRenderer({
  section,
}: DetectionSectionRendererProps) {
  switch (section.id) {
    case "logo":
      return <DetectionLogoSection logoUrl={section.logoUrl} />;
    case "fonts":
      return <DetectionTypographySection fonts={section.fonts} scale={section.scale} />;
    case "colors":
      return <DetectionColorsSection colors={section.colors} />;
    case "socials":
      return <DetectionSocialsSection socials={section.socials} />;
    case "empty":
      return <DetectionEmptySection />;
  }
}

