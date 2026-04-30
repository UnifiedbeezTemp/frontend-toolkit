"use client";

import { motion } from "framer-motion";
import { useSupabaseImages } from "../../../../lib/supabase/useSupabase";
import Text from "../../../ui/Text";
import Heading from "../../../ui/Heading";
import DetectionSectionCard from "./DetectionSectionCard";
import type { DetectionColorId, DetectionColorsSectionProps } from "../types";

export default function DetectionColorsSection({ colors }: DetectionColorsSectionProps) {
  const images = useSupabaseImages();

  const brandColorIds: DetectionColorId[] = ["primary", "accent", "background", "button", "buttonText"];
  const typographyColorIds: DetectionColorId[] = ["heading", "bodyText", "link", "muted"];

  const brandColors = colors.filter((c) => brandColorIds.includes(c.id));
  const typographyColors = colors.filter((c) => typographyColorIds.includes(c.id));

  const renderColorGrid = (items: typeof colors, title: string) => {
    if (items.length === 0) return null;

    return (
      <div className="flex flex-col gap-[1.2rem]">
        <Heading size="xs" className="text-text-secondary opacity-60 uppercase tracking-wider text-[1rem] font-bold">
          {title}
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem]">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
              className="border border-border rounded-[.8rem] py-[.2rem] px-[.5rem] bg-muted/5 flex items-center gap-[.5rem] hover:bg-muted/10 transition-colors"
            >
              <div
                className="w-[3rem] h-[3rem] rounded-[.8rem] border border-border shadow-sm flex-shrink-0"
                style={{ background: item.value }}
              />
              <div className="min-w-0 flex-1">
                <Text className="font-bold text-text-primary text-[1.3rem] truncate">
                  {item.label}
                </Text>
                <Text size="xs" className="text-text-secondary truncate opacity-70">
                  {item.value}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DetectionSectionCard title="Color Palette" iconSrc={images.colorPicker} iconAlt="Colors">
      <div className="flex flex-col gap-[2.4rem]">
        {renderColorGrid(brandColors, "Brand Colors")}
        {renderColorGrid(typographyColors, "Typography Colors")}
      </div>
    </DetectionSectionCard>
  );
}

