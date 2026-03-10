"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import ImageComponent from "../../../../../ui/ImageComponent";
import { CommunicationActivity } from "../types";
import { cn } from "../../../../../../lib/utils";
import { useCommunicationItem } from "../hooks/useCommunicationItem";

interface CommunicationItemProps {
  activity: CommunicationActivity;
  onClick?: (id: string) => void;
}

export default function CommunicationItem({
  activity,
  onClick,
}: CommunicationItemProps) {
  const { icon, iconStyle, metaStyle, iconClass, descriptionClass } =
    useCommunicationItem(activity);

  return (
    <div
      onClick={() => onClick?.(activity.id)}
      className="flex flex-col gap-[1.6rem] sm:gap-[0.8rem] p-[2.4rem] border border-border rounded-[1rem] bg-primary cursor-pointer hover:shadow-sm transition-shadow group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.2rem]">
          <div
            className={cn(
              "w-[4rem] h-[4rem] rounded-full flex items-center justify-center border",
              iconStyle,
            )}
          >
            <ImageComponent
              src={icon}
              alt={activity.type}
              width={24}
              height={24}
              className={iconClass}
            />
          </div>
          <Text className="text-[1.6rem] sm:text-[2rem] font-bold text-dark-base-100">
            {activity.title}
          </Text>
          <div className={cn("hidden sm:block shrink-0", metaStyle)}>
            {activity.meta}
          </div>
        </div>
        <div className="flex items-center gap-[1.2rem]">
          <div className={cn("sm:hidden shrink-0", metaStyle)}>
            {activity.meta}
          </div>
          <Text className="hidden sm:block text-[1.2rem] font-bold text-dark-base-40">
            {activity.date} {activity.time}
          </Text>
        </div>
      </div>

      <Text className={descriptionClass}>{activity.description}</Text>

      <Text className="sm:hidden text-[1.2rem] font-bold text-dark-base-40">
        {activity.date} {activity.time}
      </Text>
    </div>
  );
}
