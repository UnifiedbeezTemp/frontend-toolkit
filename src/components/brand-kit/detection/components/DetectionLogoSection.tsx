"use client";

import { motion } from "framer-motion";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import DetectionSectionCard from "./DetectionSectionCard";
import type { DetectionLogoSectionProps } from "../types";

export default function DetectionLogoSection({
  logoUrl,
}: DetectionLogoSectionProps) {
  const icons = useSupabaseIcons();

  return (
    <DetectionSectionCard iconAlt="Logo" title={""}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full flex items-center justify-center"
      >
        <div className="w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] xl:w-[18rem] xl:h-[18rem] rounded-[2.4rem] flex items-center justify-center overflow-hidden">
          <ImageComponent
            src={logoUrl}
            alt="Detected logo"
            width={160}
            height={160}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </motion.div>
    </DetectionSectionCard>
  );
}
