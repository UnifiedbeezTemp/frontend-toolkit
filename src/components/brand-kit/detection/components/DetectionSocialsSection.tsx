"use client";

import { motion } from "framer-motion";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import Text from "../../../ui/Text";
import DetectionSectionCard from "./DetectionSectionCard";
import type { DetectionSocialsSectionProps } from "../types";

export default function DetectionSocialsSection({
  socials,
}: DetectionSocialsSectionProps) {
  const icons = useSupabaseIcons();

  return (
    <DetectionSectionCard
      title="Social links"
      iconSrc={icons.link}
      iconAlt="Links"
    >
      <div className="flex flex-col gap-[0.8rem] xl:grid xl:grid-cols-2 xl:gap-[1.2rem]">
        {socials.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: index * 0.12,
            }}
            className="border border-border rounded-[1.4rem] px-[1.2rem] py-[1rem] bg-muted/10 hover:border-brand-primary transition-colors flex items-center justify-between gap-[1.2rem]"
          >
            <div className="flex items-center gap-[1rem] min-w-0">
              <div className="w-[3.6rem] h-[3.6rem] rounded-[1.2rem] border border-border bg-primary flex items-center justify-center">
                <ImageComponent
                  src={icons[item.iconKey]}
                  alt={item.label}
                  width={18}
                  height={18}
                  className="w-[1.8rem] h-[1.8rem] object-contain"
                />
              </div>
              <div className="min-w-0">
                <Text className="font-[800] text-text-secondary">
                  {item.label}
                </Text>
                <Text size="xs" className="text-text-secondary truncate">
                  {item.url}
                </Text>
              </div>
            </div>
            <ImageComponent
              src={icons.linkExternal}
              alt="Open"
              width={16}
              height={16}
              className="w-[1.6rem] h-[1.6rem] opacity-70"
            />
          </motion.a>
        ))}
      </div>
    </DetectionSectionCard>
  );
}
