import React from "react";
import { cn, getCurrentTime } from "@/shared/src/lib/utils";
import MobileSignalIcon from "@/shared/src/assets/icons/MobileSignalIcon";
import WifiIcon from "@/shared/src/assets/icons/WifiIcon";
import BatteryIcon from "@/shared/src/assets/icons/BatteryIcon";

interface PhoneStatusBarProps {
  isThumbnail?: boolean;
}

export function PhoneStatusBar({ isThumbnail = false }: PhoneStatusBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-[2.4rem] pt-[0.8rem]",
        isThumbnail ? "h-[2rem]" : "h-[4rem]",
      )}
    >
      <span
        className={cn(
          "font-bold text-black",
          isThumbnail ? "text-[0.8rem]" : "text-[1.2rem]",
        )}
      >
        {getCurrentTime()}
      </span>
      <div className="flex items-center gap-[0.4rem]">
        <MobileSignalIcon size={isThumbnail ? 12 : 16} color="black" />
        <WifiIcon size={isThumbnail ? 10 : 14} color="black" />
        <BatteryIcon size={isThumbnail ? 16 : 22} color="black" />
      </div>
    </div>
  );
}
