"use client";

import ImageComponent from "../../../ui/ImageComponent";
import Heading from "../../../ui/Heading";
import { cn } from "../../../../lib/utils";
import type { DetectionSectionCardProps } from "../types";

export default function DetectionSectionCard({
  title,
  iconSrc,
  iconAlt,
  children,
  className,
}: DetectionSectionCardProps) {
  return (
    <div
      className={cn(
        "border border-border rounded-[1.6rem] p-[1.6rem] sm:p-[2rem] bg-primary shadow-sm highlight-inside",
        className,
      )}
    >
      <div className="flex items-center gap-[1rem]">
        {iconSrc ? (
          <div className=" flex items-center justify-center">
            <ImageComponent
              src={iconSrc}
              alt={iconAlt ?? title}
              width={58}
              height={58}
              className=" object-cover"
            />
          </div>
        ) : null}
        <Heading size="xs" className="text-text-secondary">
          {title}
        </Heading>
      </div>

      <div className="mt-[1.2rem]">{children}</div>
    </div>
  );
}

