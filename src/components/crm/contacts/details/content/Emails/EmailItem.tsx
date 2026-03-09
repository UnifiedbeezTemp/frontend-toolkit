"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import { EmailActivity } from "../types";
import { cn } from "../../../../../../lib/utils";
import ImageComponent from "../../../../../ui/ImageComponent";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";

interface EmailItemProps {
  email: EmailActivity;
  isLast?: boolean;
}

export default function EmailItem({ email, isLast }: EmailItemProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages();
  const isUnread = email.status === "unread";

  const avatarSrc =
    (email.senderAvatar && images[email.senderAvatar as keyof typeof images]) ||
    icons.userGreen;

  return (
    <div
      className={cn(
        "flex flex-col gap-[1rem] sm:gap-[1.2rem] p-[1.6rem] sm:p-4 hover:bg-input-filled transition-colors cursor-pointer group relative",
        !isLast && "border-b border-border",
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-[1rem] sm:gap-[1.2rem]">
          <div className="w-[4rem] h-[4rem] rounded-full bg-gray-100 overflow-hidden shrink-0 border border-input-stroke">
            <ImageComponent
              src={avatarSrc}
              alt={email.senderName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <Text className="text-[1.4rem] sm:text-[1.5rem] font-bold text-dark-base-100 leading-tight">
              {email.senderName}
            </Text>
            <Text className="text-[1.3rem] text-dark-base-40 font-medium">
              {email.senderHandle}
            </Text>
          </div>
        </div>

        <Text className="text-[1.2rem] sm:text-[1.3rem] font-medium text-dark-base-40 whitespace-nowrap">
          {email.date}
        </Text>
      </div>

      <div className="px-0 sm:pl-[5.2rem] flex flex-col gap-[0.4rem] pr-[2.4rem] sm:pr-[4rem]">
        <div className="flex flex-wrap items-center gap-x-[0.4rem]">
          <Text className="text-[1.4rem] sm:text-[1.5rem] font-bold text-dark-base-100 leading-snug">
            {email.subject}
          </Text>
          <Text className="text-[1.4rem] sm:text-[1.5rem] text-dark-base-40 leading-relaxed line-clamp-2">
            - {email.preview}
          </Text>
        </div>
      </div>

      {isUnread && (
        <div className="absolute right-[1.6rem] sm:right-[2.4rem] bottom-[1.6rem] sm:bottom-[2.4rem] w-[1.8rem] h-[1.8rem] rounded-full bg-destructive flex items-center justify-center shrink-0 shadow-sm">
          <Text className="text-[0.9rem] font-bold text-white leading-none">
            1
          </Text>
        </div>
      )}
    </div>
  );
}
