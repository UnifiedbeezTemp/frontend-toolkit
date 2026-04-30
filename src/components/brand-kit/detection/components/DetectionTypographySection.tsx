"use client";

import { useSupabaseImages, useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import DetectionSectionCard from "./DetectionSectionCard";
import DetectionFontCard from "./DetectionFontCard";
import type { DetectionTypographySectionProps } from "../types";

import { motion } from "framer-motion";
import Text from "../../../ui/Text";
import Heading from "../../../ui/Heading";

export default function DetectionTypographySection({
  fonts,
  scale,
}: DetectionTypographySectionProps) {
  const images = useSupabaseImages();

  return (
    <DetectionSectionCard
      title="Typography"
      iconSrc={images.typo}
      iconAlt="Typography"
    >
      <div className="flex flex-col gap-[2.4rem]">
        {/* Font Families */}
        <div className="flex flex-col gap-[1.2rem]">
          <Heading size="xs" className="text-text-secondary opacity-60 uppercase tracking-wider text-[1rem] font-bold">
            Typefaces
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem]">
            {fonts.map((item, index) => (
              <DetectionFontCard key={item.kind} item={item} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Typography Scale */}
        {scale.length > 0 && (
          <div className="flex flex-col gap-[1.2rem]">
            <Heading size="xs" className="text-text-secondary opacity-60 uppercase tracking-wider text-[1rem] font-bold">
              Visual Scale
            </Heading>
            <div className="border border-border rounded-[1.4rem] p-[1.6rem] bg-muted/5 flex flex-col gap-[1.6rem]">
              {scale.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                  className="flex items-baseline border-b border-border/40 last:border-0 pb-[1.2rem] last:pb-0"
                >
                  <Text className="w-[8rem] flex-shrink-0 text-text-secondary font-medium text-[1.1rem] opacity-60">
                    {item.label}
                  </Text>
                  <div className="flex-1 flex items-baseline justify-between">
                    <span 
                      className="text-text-primary truncate max-w-[15rem]"
                      style={{ 
                        fontSize: item.value,
                        fontFamily: fonts.find(f => f.kind === 'header')?.family || fonts[0]?.family || 'inherit',
                        fontWeight: 600
                      }}
                    >
                      The quick brown fox
                    </span>
                    <Text className="text-text-secondary text-[1.1rem] opacity-50 font-mono">
                      {item.value}
                    </Text>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DetectionSectionCard>
  );
}
