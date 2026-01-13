"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { IconListProps } from "./IconList.types";
import { layoutClasses, gapClasses } from "./IconList.constants";
import IconItemComponent from "./IconItem";
import MarqueeContainer from "./MarqueeContainer";

export default function IconList({
  icons,
  layout = "horizontal",
  size = "md",
  gap = "md",
  hover = true,
  rounded = false,
  background = false,
  className = "",
}: IconListProps) {
  const [popIndex, setPopIndex] = useState(-1);

  useEffect(() => {
    if (layout !== "marquee") return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setPopIndex(randomIndex);

      setTimeout(() => setPopIndex(-1), 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [icons.length, layout]);

  if (layout === "marquee") {
    return (
      <MarqueeContainer
        icons={icons}
        size={size}
        gap={gap}
        hover={hover}
        rounded={rounded}
        background={background}
        popIndex={popIndex}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(layoutClasses[layout], gapClasses[gap], className)}
      role="list"
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
        />
      ))}
    </div>
  );
}
