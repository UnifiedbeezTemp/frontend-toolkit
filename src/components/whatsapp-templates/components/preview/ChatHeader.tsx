import React from "react";
import { cn } from "@/shared/src/lib/utils";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import VerifiedBadgeIcon from "@/shared/src/assets/icons/VerifiedBadgeIcon";

interface ChatHeaderProps {
  beeImg: string;
  isThumbnail?: boolean;
}

export function ChatHeader({ beeImg, isThumbnail = false }: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center px-[2rem] gap-[0.8rem] border-b border-border shadow-sm bg-primary",
        isThumbnail ? "h-[3rem]" : "h-[5rem]",
      )}
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center border border-border",
          isThumbnail ? "w-[2.4rem] h-[2.4rem]" : "w-[3.2rem] h-[3.2rem]",
        )}
      >
        <ImageComponent
          src={beeImg}
          alt="UnifiedBeez"
          width={isThumbnail ? 16 : 20}
          height={isThumbnail ? 16 : 20}
        />
      </div>
      <div className="flex items-center gap-[0.3rem]">
        <span
          className={cn(
            "font-bold text-text-secondary",
            isThumbnail ? "text-[1rem]" : "text-[1.4rem]",
          )}
        >
          UnifiedBeez
        </span>
        {!isThumbnail && <VerifiedBadgeIcon size={16} />}
      </div>
    </div>
  );
}
