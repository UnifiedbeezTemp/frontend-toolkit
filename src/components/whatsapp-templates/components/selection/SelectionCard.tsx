import React from "react";
import { cn } from "../../../../lib/utils";
import ImageComponent from "../../../ui/ImageComponent";

interface SelectionCardProps {
  id: string;
  title: string;
  description: string;
  icon: (isActive: boolean) => React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  icons: { checkboxBase2: string };
}

export function SelectionCard({
  title,
  description,
  icon,
  isActive,
  onClick,
  icons,
}: SelectionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-row lg:flex-col items-center lg:items-start p-[1.6rem] rounded-[1.2rem] border cursor-pointer transition-all gap-[1.2rem] lg:gap-0 lg:min-h-[16rem]",
        isActive
          ? "bg-gradient-yellow-1 border-brand-primary"
          : "bg-primary border-border hover:border-brand-primary/30",
      )}
    >
      <div
        className={cn(
          "shrink-0 w-[4.8rem] h-[4.8rem] rounded-[0.8rem] flex items-center justify-center transition-colors lg:mb-[1.6rem]",
          isActive ? "bg-brand-gradient-2 shadow-sm" : "bg-black-5",
        )}
      >
        {icon(isActive)}
      </div>

      <div className="flex-1 flex flex-col gap-[0.4rem]">
        <h4 className="text-[1.4rem] font-bold text-text-secondary leading-[1.2]">
          {title}
        </h4>
        <p className="text-[1.2rem] text-text-primary leading-[1.4]">
          {description}
        </p>
      </div>

      <div className="shrink-0 w-[2rem] h-[2rem] lg:absolute lg:top-[1.6rem] lg:right-[1.6rem]">
        {isActive ? (
          <ImageComponent
            src={icons.checkboxBase2}
            alt="selected"
            width={20}
            height={20}
          />
        ) : (
          <div className="w-[2rem] h-[2rem] rounded-full border border-input-stroke" />
        )}
      </div>
    </div>
  );
}
