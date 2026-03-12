"use client";

import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { CommunicationActivity } from "../types";
import { cn } from "../../../../../../lib/utils";

export const useCommunicationItem = (activity: CommunicationActivity) => {
  const icons = useSupabaseIcons() as Record<string, string>;

  const getIcon = () => {
    if (activity.type === "message") return icons.messageGray;
    if (activity.type === "video") return icons.tablerVideo2;
    if (activity.type === "call") {
      if (activity.direction === "outbound") return icons.phoneOut;
      if (activity.direction === "inbound") return icons.phoneIn;
      if (activity.direction === "missed") return icons.phoneX;
    }
    return icons.phoneIcon;
  };

  const getIconStyle = () => {
    if (activity.type === "call" && activity.direction === "missed") {
      return "border-destructive/20 text-destructive";
    }
    return "border-border text-brand-primary";
  };

  const getMetaStyle = () => {
    return "bg-transparent text-dark-base-40 text-[1.2rem] font-bold px-[1rem] py-[0.6rem] rounded-[0.8rem] border border-input-stroke tracking-tight";
  };

  const getIconClass = () => {
    return cn(
      activity.direction === "missed" &&
        "grayscale-0 brightness-0 invert-0 sepia-0 saturate-200 hue-rotate-[320deg]",
    );
  };

  const getDescriptionClass = () => {
    return cn(
      "text-[1.4rem] text-dark-base-70 leading-relaxed font-medium",
      activity.type === "message" &&
        "bg-input-filled p-[1.6rem] rounded-[1rem]",
    );
  };

  return {
    icon: getIcon(),
    iconStyle: getIconStyle(),
    metaStyle: getMetaStyle(),
    iconClass: getIconClass(),
    descriptionClass: getDescriptionClass(),
  };
};
