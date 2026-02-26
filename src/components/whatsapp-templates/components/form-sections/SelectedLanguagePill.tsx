import React from "react";
import ImageComponent from "../../../ui/ImageComponent";

interface SelectedLanguagePillProps {
  info: { flag: string; code: string };
  icons: { gridDropdown: string };
}

export function SelectedLanguagePill({
  info,
  icons,
}: SelectedLanguagePillProps) {
  return (
    <div className="flex items-center gap-[0.6rem] px-[0.8rem] py-[0.4rem] border border-input-stroke rounded-[0.8rem] bg-primary shadow-sm hover:bg-input-filled/30 transition-colors">
      <span className="text-[1.6rem] leading-none">{info.flag}</span>
      <span className="text-[1.2rem] font-bold text-text-secondary uppercase">
        {info.code}
      </span>
      <ImageComponent
        src={icons.gridDropdown}
        alt="v"
        width={12}
        height={12}
        className="opacity-40"
      />
    </div>
  );
}
