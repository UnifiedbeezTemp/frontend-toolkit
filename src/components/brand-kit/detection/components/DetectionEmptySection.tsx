"use client";

import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import DetectionSectionCard from "./DetectionSectionCard";

export default function DetectionEmptySection() {
  const icons = useSupabaseIcons();

  return (
    <DetectionSectionCard title="No brand elements found" iconSrc={icons.searchSmIcon}>
      <div className="flex flex-col items-center text-center gap-[0.8rem] py-[1.6rem]">
        <div className="w-[6rem] h-[6rem] rounded-full bg-muted/10 border border-border flex items-center justify-center">
          <ImageComponent
            src={icons.searchIg}
            alt="Search"
            width={28}
            height={28}
            className="w-[2.8rem] h-[2.8rem] opacity-80"
          />
        </div>
        <Heading size="xs" className="text-text-secondary">
          We couldn’t detect clear brand assets
        </Heading>
        <Text size="xs" className="text-text-secondary max-w-[44rem]">
          Some websites block scraping or load styles dynamically. You can still
          set your logo, colors, fonts and links manually.
        </Text>
      </div>
    </DetectionSectionCard>
  );
}

