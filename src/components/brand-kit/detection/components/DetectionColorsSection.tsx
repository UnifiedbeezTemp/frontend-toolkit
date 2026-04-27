"use client";

import { motion } from "framer-motion";
import { useSupabaseImages } from "../../../../lib/supabase/useSupabase";
import Text from "../../../ui/Text";
import Heading from "../../../ui/Heading";
import DetectionSectionCard from "./DetectionSectionCard";
import type { DetectionColorsSectionProps } from "../types";

export default function DetectionColorsSection({ colors }: DetectionColorsSectionProps) {
  const images = useSupabaseImages();

  return (
    <DetectionSectionCard title="Colors" iconSrc={images.colorPicker} iconAlt="Colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2rem]">
        {colors.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.12 }}
            className="border border-border rounded-[1.4rem] p-[1.4rem] bg-muted/10 flex items-center gap-[1.2rem]"
          >
            <div
              className="w-[4rem] h-[4rem] rounded-[1.2rem] border border-border shadow-sm"
              style={{ background: item.value }}
            />
            <div className="min-w-0 flex-1">
              <Heading size="xs" className="text-text-secondary">
                {item.label}
              </Heading>
              <Text size="xs" className="text-text-secondary truncate mt-[0.2rem]">
                {item.value}
              </Text>
              {item.rgb ? (
                <Text size="xs" className="text-text-secondary truncate mt-[0.2rem]">
                  {item.rgb}
                </Text>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </DetectionSectionCard>
  );
}

