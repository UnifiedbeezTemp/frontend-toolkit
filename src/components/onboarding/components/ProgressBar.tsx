"use client";

import React from "react";
import { motion } from "framer-motion";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

interface ProgressProps {
  progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressProps) {
  const supabaseIcons = useSupabaseIcons();
  return (
    <div className="h-[1rem] bg-input-filled border border-border rounded-full shadow mt-[2.6rem] mb-[1.6rem]">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full relative"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10"
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ImageComponent
            alt="bee icon"
            src={supabaseIcons.beeGreenRight}
            width={25}
            height={25}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
