"use client";

import React from "react";
import {
  ModeColorState,
  BrandFontState,
  SocialLink,
} from "../../types/brandKitTypes";
import { getFontWeightStyle, getPlatformIcon } from "../../utils/brandKitUtils";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";

interface Props {
  colors: ModeColorState;
  fonts: BrandFontState;
  socialLinks: SocialLink[];
}

export default function EmailFooter({ colors, fonts, socialLinks }: Props) {
  const icons = useSupabaseIcons();

  const bodyStyle = {
    fontFamily: fonts.body.family,
    ...getFontWeightStyle(fonts.body.weight, fonts.body.style),
    color: colors.primary,
  };

  const activeLinks = socialLinks.filter((link) => link.url);

  return (
    <div className="mt-[5rem] pb-[2rem] flex flex-col items-center">
      {activeLinks.length > 0 && (
        <div className="flex gap-[1.5rem] mb-[2.5rem]">
          {activeLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageComponent
                src={getPlatformIcon(link.platform, icons)}
                alt={link.platform}
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
      )}

      <p className="text-[1.4rem] text-center" style={bodyStyle}>
        123 Main Street Anytown, CA 12345
      </p>
      <p className="text-[1.4rem] text-center" style={bodyStyle}>
        mail@example.com +123456789
      </p>

      <p className="text-[1.4rem] mt-[2.4rem] text-center" style={bodyStyle}>
        No longer want to receive these emails?{" "}
        <span
          className="underline cursor-pointer"
          style={{ color: colors.primary }}
        >
          Unsubscribe
        </span>
      </p>
    </div>
  );
}
