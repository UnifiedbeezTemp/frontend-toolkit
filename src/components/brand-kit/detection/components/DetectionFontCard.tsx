"use client";

import { motion } from "framer-motion";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import type { DetectionFontCardProps } from "../types";

export default function DetectionFontCard({ item, delay }: DetectionFontCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className="border border-border rounded-[1.4rem] p-[1.4rem] bg-muted/10"
    >
      <Text size="xs" className="text-text-secondary">
        {item.label}
      </Text>
      <div className="mt-[0.6rem] flex items-start justify-between gap-[1.2rem]">
        <div className="min-w-0">
          <Heading size="xs" className="truncate">
            {item.family}
          </Heading>
          {item.weight ? (
            <Text size="xs" className="text-text-secondary mt-[0.2rem]">
              Weight {item.weight}
            </Text>
          ) : null}
        </div>
        <div
          className="text-[2.4rem] leading-none text-black"
          style={{
            fontFamily: item.family,
            fontWeight: item.weight ? Number.parseInt(item.weight, 10) : undefined,
          }}
        >
          Aa
        </div>
      </div>
      <div
        className="mt-[1rem] text-[1.6rem] text-text-primary"
        style={{
          fontFamily: item.family,
          fontWeight: item.weight ? Number.parseInt(item.weight, 10) : undefined,
        }}
      >
        The quick brown fox
      </div>
    </motion.div>
  );
}

