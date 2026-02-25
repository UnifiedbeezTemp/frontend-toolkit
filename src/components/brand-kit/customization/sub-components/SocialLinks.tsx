"use client";

import React from "react";
import SocialLinkItem from "./social/SocialLinkItem";
import { useBrandKit } from "../../BrandKitContext";
import Heading from "../../../ui/Heading";
import ImageComponent from "../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Button from "../../../ui/Button";
import { SocialPlatform } from "../../types/brandKitTypes";

export default function SocialLinks() {
  const { socialLinks, socialHandlers } = useBrandKit();
  const icons = useSupabaseIcons();

  return (
    <div className="pb-[4rem] flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Social Links</Heading>
      </div>

      <div className="flex flex-col gap-[1.6rem]">
        {socialLinks.map((link, index) => (
          <SocialLinkItem
            key={index}
            platform={link.platform}
            url={link.url}
            onUrlChange={(url: string) =>
              socialHandlers.onUpdateLink(index, url)
            }
            onPlatformChange={(platform: SocialPlatform) =>
              socialHandlers.onUpdatePlatform(index, platform)
            }
            onDelete={() => socialHandlers.onRemoveLink(index)}
          />
        ))}

        <Button
          onClick={socialHandlers.onAddLink}
          variant="secondary"
          className="py-[0.5rem] w-fit"
        >
          <ImageComponent
            src={icons.plus}
            alt="add"
            width={16}
            height={16}
            className="mr-[0.8rem]"
          />
          Add social link
        </Button>
      </div>
    </div>
  );
}
