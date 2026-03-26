"use client";

import React from "react";
import ImageComponent from "../../../../../../ui/ImageComponent";
import { EMAIL_COMPOSER_TOOLS } from "../../constants/EmailComposerConstants";
import { cn } from "../../../../../../../lib/utils";

interface EmailComposerToolbarProps {
  icons: Record<string, string>;
  onAction: (command: string, value?: string) => void;
  activeStyles: Record<string, boolean>;
}

export default function EmailComposerToolbar({
  icons,
  onAction,
  activeStyles,
}: EmailComposerToolbarProps) {
  const tools = EMAIL_COMPOSER_TOOLS(icons);

  return (
    <div className="flex items-center gap-[1.2rem] sm:gap-[3rem] sticky top-0 px-[1.6rem] py-[1.2rem] sm:px-[2.4rem] z-10 shrink-0">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onMouseDown={(e) => {
            e.preventDefault();
            onAction(tool.command);
          }}
          className={cn(
            "hover:bg-input-filled rounded-[1rem] transition-colors shrink-0 p-[0.4rem]",
            activeStyles[tool.command] && "bg-input-stroke",
          )}
          title={tool.alt}
        >
          <ImageComponent
            src={tool.src}
            alt={tool.alt}
            width={22}
            height={22}
            className={cn(
              "transition-opacity",
              activeStyles[tool.command] ? "opacity-100" : "opacity-60",
            )}
          />
        </button>
      ))}
    </div>
  );
}
