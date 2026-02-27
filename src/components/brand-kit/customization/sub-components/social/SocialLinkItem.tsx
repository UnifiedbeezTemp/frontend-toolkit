"use client";

import React, { useRef, useState } from "react";
import ImageComponent from "../../../../ui/ImageComponent";
import Input from "../../../../ui/Input";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { cn } from "../../../../../lib/utils";
import { SmartDropdown } from "../../../../smart-dropdown";
import { SocialLinkItemProps } from "../../../types/brandKitTypes";
import { PLATFORMS } from "../../../constants/brandKitConstants";
import { getPlatformIcon } from "../../../utils/brandKitUtils";

export default function SocialLinkItem({
  platform,
  url,
  onUrlChange,
  onPlatformChange,
  onDelete,
}: SocialLinkItemProps) {
  const icons = useSupabaseIcons();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-[1.2rem] w-full animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="relative">
        <div
          ref={triggerRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-[0.8rem] px-[1.2rem] py-[1.2rem] bg-white border border-input-stroke rounded-[0.8rem] cursor-pointer hover:border-brand-primary transition-all shadow-sm h-[4.8rem] min-w-[14rem]"
        >
          <ImageComponent
            src={getPlatformIcon(platform, icons)}
            alt={platform}
            width={20}
            height={20}
          />
          <span className="text-[1.4rem] font-[500] text-text-primary">
            {platform}
          </span>
          <ImageComponent
            src={icons.smArrowDown}
            alt="dropdown"
            width={14}
            height={14}
            className={cn(
              "ml-auto transition-transform",
              isDropdownOpen && "rotate-180",
            )}
          />
        </div>

        <SmartDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          triggerRef={triggerRef}
          placement="bottom-start"
          className="min-w-[16rem]"
        >
          <div className="flex flex-col py-[0.8rem]">
            {PLATFORMS.map((p) => (
              <div
                key={p}
                onClick={() => {
                  onPlatformChange(p);
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  "flex items-center gap-[1rem] px-[1.6rem] py-[1.2rem] hover:bg-soft-green cursor-pointer text-[1.4rem] transition-colors",
                  platform === p
                    ? "text-brand-primary bg-soft-green/50 font-[600]"
                    : "text-text-primary",
                )}
              >
                <ImageComponent
                  src={getPlatformIcon(p, icons)}
                  alt={p}
                  width={18}
                  height={18}
                />
                {p}
              </div>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <div className="flex-1">
        <Input
          placeholder={`Enter ${platform} URL`}
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="h-[4.8rem]"
        />
      </div>

      <button
        onClick={onDelete}
        className="p-[1.2rem] text-text-secondary cursor-pointer hover:text-error transition-colors rounded-[0.8rem]"
      >
        <ImageComponent
          src={icons.trash}
          alt="delete"
          width={20}
          height={20}
          className="group-hover:grayscale-0 grayscale transition-all"
        />
      </button>
    </div>
  );
}
