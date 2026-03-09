"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import ImageComponent from "../../../../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../../../lib/supabase/useSupabase";

export interface ActivityDetailsModalParticipantsProps {
  participants: { name: string; avatar: string }[];
  images: Record<string, string>;
}

export default function ActivityDetailsModalParticipants({
  participants,
  images,
}: ActivityDetailsModalParticipantsProps) {
  const icons = useSupabaseIcons() as Record<string, string>;

  if (!participants || participants.length === 0) return null;

  return (
    <div className="flex flex-col gap-[1.2rem] sm:gap-[1.6rem]">
      <Text className="text-[1.4rem] sm:text-[1.6rem] font-bold text-dark-base-100">
        Participants
      </Text>
      <div className="flex flex-wrap gap-[1.6rem] sm:gap-[2.4rem]">
        {participants.map((p, idx) => (
          <div key={idx} className="flex items-center gap-[0.8rem]">
            <div className="w-[2.8rem] h-[2.8rem] sm:w-[3.2rem] sm:h-[3.2rem] rounded-full overflow-hidden border border-input-stroke">
              <ImageComponent
                src={images[p.avatar as keyof typeof images] || icons.userGreen}
                alt={p.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <Text className="text-[1.3rem] sm:text-[1.4rem] font-medium text-dark-base-100/80">
              {p.name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
