import React from "react";
import { cn } from "../../../lib/utils";
import { IconItem, IconSize, IconGap } from "./IconList.types";
import { gapClasses, gapValues } from "./IconList.constants";
import IconItemComponent from "./IconItem";

interface MarqueeContainerProps {
  icons: IconItem[];
  size: IconSize;
  gap: IconGap;
  hover: boolean;
  rounded: boolean;
  background: boolean;
  popIndex: number;
  className?: string;
}

export default function MarqueeContainer({
  icons,
  size,
  gap,
  hover,
  rounded,
  background,
  popIndex,
  className,
}: MarqueeContainerProps) {
  const MarqueeContent = () => (
    <div
      className={cn("flex shrink-0 items-center", gapClasses[gap])}
      style={{ paddingRight: gapValues[gap] }}
    >
      {icons.map((iconItem, index) => (
        <IconItemComponent
          key={index}
          iconItem={iconItem}
          index={index}
          size={size}
          hover={hover}
          rounded={rounded}
          background={background}
          isPopping={index === popIndex}
        />
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden mask-fade-x pb-[1.4rem]",
        className
      )}
    >
      <div
        className="flex animate-marquee-infinite"
        style={{ animationDuration: `${icons.length * 4}s` }}
      >
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>

      <style>{`
        .mask-fade-x {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-marquee-infinite {
          animation: marquee-infinite linear infinite;
        }
        .animate-pop {
          animation: pop 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
