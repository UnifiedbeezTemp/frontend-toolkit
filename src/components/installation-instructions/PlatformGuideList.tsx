"use client";

import ImageComponent from "../ui/ImageComponent";
import Text from "../ui/Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { platformGuides } from "./constants";

interface PlatformGuide {
  id: string;
  name: string;
  icon: string;
}

interface PlatformGuideListProps {
  onSelect: (id: string) => void;
}

export default function PlatformGuideList({
  onSelect,
}: PlatformGuideListProps) {
  const icons = useSupabaseIcons();

  return (
    <div>
      <div className="mb-[1.6rem] bg-primary inline-block px-[1.2rem] py-[0.6rem] rounded-[0.6rem]">
        <Text className="text-[1.2rem] font-bold">
          External platforms Installation Guides
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-[1.2rem]">
        {platformGuides.map((platform: PlatformGuide) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className="flex items-center gap-[1.2rem] p-[1.2rem] rounded-[0.7rem] bg-primary border border-transparent hover:border-brand-primary hover:bg-primary/95 transition-all text-left shadow-sm"
          >
            <div className="shrink-0">
              <ImageComponent
                src={icons[platform.icon as keyof typeof icons] || icons.defaultIcon}
                alt={platform.name}
                width={24}
                height={24}
              />
            </div>
            <Text className="text-[1.4rem] font-bold text-brand-primary truncate">
              {platform.name}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
}
