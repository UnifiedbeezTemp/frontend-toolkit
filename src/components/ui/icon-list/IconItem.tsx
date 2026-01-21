import React from "react";
import { cn } from "../../../lib/utils";
import { IconItem, IconSize } from "./IconList.types";
import { sizeClasses } from "./IconList.constants";

interface IconItemComponentProps {
  iconItem: IconItem;
  index: number;
  size: IconSize;
  hover: boolean;
  rounded: boolean;
  background: boolean;
  isPopping?: boolean;
}

export default function IconItemComponent({
  iconItem,
  index,
  size,
  hover,
  rounded,
  background,
  isPopping,
}: IconItemComponentProps) {
  const handleIconClick = (e: React.MouseEvent) => {
    if (iconItem.onClick) {
      e.preventDefault();
      iconItem.onClick();
    }
  };

  const iconContent = (
    <div
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200",
        sizeClasses[size],
        hover && "hover:scale-110 active:scale-95 cursor-pointer",
        rounded && "rounded-full",
        background && "bg-primary border border-border shadow-sm",
        background && rounded && "p-2",
        isPopping && "animate-pop"
      )}
      aria-label={iconItem.label || `Icon ${index + 1}`}
    >
      {iconItem.icon}
    </div>
  );

  if (iconItem.href) {
    return (
      <a
        href={iconItem.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleIconClick}
        className="inline-block"
      >
        {iconContent}
      </a>
    );
  }

  if (iconItem.onClick) {
    return (
      <button
        type="button"
        onClick={handleIconClick}
        className="inline-block border-0 bg-transparent p-0"
      >
        {iconContent}
      </button>
    );
  }

  return <div>{iconContent}</div>;
}
