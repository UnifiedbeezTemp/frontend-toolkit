"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import { TimelineActivity } from "../types";
import { cn } from "../../../../../../lib/utils";
import ImageComponent from "../../../../../ui/ImageComponent";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";
import { CATEGORY_STYLES } from "../constants";

interface ActivityTimelineItemProps {
  activity: TimelineActivity;
  isLast?: boolean;
  contactName: string;
  contactAvatar?: string;
  onSelectActivity: (id: string) => void;
}

export default function ActivityTimelineItem({
  activity,
  isLast,
  contactName,
  contactAvatar,
  onSelectActivity,
}: ActivityTimelineItemProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages();
  const styles = CATEGORY_STYLES[activity.category];

  return (
    <div className="flex gap-0 sm:gap-[2.4rem] group relative">
      <div className="hidden sm:flex flex-col items-center shrink-0">
        <div
          className={cn(
            "w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center z-10 border shadow-sm",
            styles.bgColor,
            styles.borderColor,
          )}
        >
          <ImageComponent
            src={icons[styles.icon] || icons.userGreen}
            alt={activity.category}
            width={18}
            height={18}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        {!isLast && (
          <div className="w-[0.2rem] flex-1 bg-input-stroke -mt-[0.2rem] mb-[-2.4rem] z-0" />
        )}
      </div>

      <div
        className={cn(
          "flex-1 border border-input-stroke rounded-[1.2rem] p-[1.6rem] mb-[1.6rem] shadow-sm relative overflow-visible",
          "border-l-[0.3rem]",
          styles.leftBorderColor,
        )}
      >
        <div className="sm:hidden absolute -top-[1.4rem] -left-[1.4rem] z-10">
          <div
            className={cn(
              "w-[3.2rem] h-[3.2rem] rounded-full flex items-center justify-center border-[0.3rem] border-primary shadow-sm",
              styles.bgColor,
            )}
          >
            <ImageComponent
              src={icons[styles.icon] || icons.userGreen}
              alt={activity.category}
              width={14}
              height={14}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>

        <div className="flex items-start justify-between mb-[1.2rem]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem]">
            <Text className="text-[1.6rem] font-bold text-dark-base-100">
              {activity.title}
            </Text>
            <span
              className={cn(
                "text-[1.4rem] px-[0.8rem] py-[0.3rem] rounded-[.8rem] border",
                styles.badgeColor,
              )}
            >
              {activity.status}
            </span>
          </div>
          <Text className="text-[1.2rem] font-medium text-dark-base-40">
            {activity.date} {activity.time}
          </Text>
        </div>

        <Text className="text-[1.4rem] leading-relaxed text-dark-base-100/60 mb-[1.6rem]">
          {activity.description}
        </Text>

        <div className="flex items-center justify-between pt-[1.2rem]">
          <div className="flex items-center gap-[0.8rem]">
            <div className="w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden border border-input-stroke">
              <ImageComponent
                src={
                  (contactAvatar &&
                    images[contactAvatar as keyof typeof images]) ||
                  icons.userGreen
                }
                alt={contactName}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <Text className="text-[1.3rem] font-medium text-dark-base-40">
              {contactName}
            </Text>
          </div>
          <button
            onClick={() => onSelectActivity(activity.id)}
            className="text-[1.3rem] font-bold text-dark-base-40 hover:text-dark-base-100 transition-colors"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
