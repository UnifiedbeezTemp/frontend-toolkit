import React from "react";
import ReplyArrowIcon from "@/shared/src/assets/icons/ReplyArrowIcon";

interface ButtonsListProps {
  buttons: { type: string; text: string }[];
  isThumbnail?: boolean;
}

import { cn } from "@/shared/src/lib/utils";

export function ButtonsList({
  buttons,
  isThumbnail = false,
}: ButtonsListProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-[0.4rem]",
        isThumbnail ? "mt-[0.3rem]" : "mt-[0.6rem]",
      )}
    >
      {buttons.map((btn, idx) => (
        <div
          key={idx}
          className={cn(
            "w-full bg-primary rounded-[1rem] flex items-center justify-center gap-[0.8rem] text-primary-blue font-medium shadow-sm",
            isThumbnail
              ? "py-[0.4rem] text-[0.6rem]"
              : "py-[1rem] text-[1.3rem]",
          )}
        >
          <ReplyArrowIcon
            size={isThumbnail ? 8 : 14}
            color="var(--primary-blue)"
          />
          {btn.text || "Button"}
        </div>
      ))}
    </div>
  );
}
