"use client";

import { useState } from "react";
import { SocialPlatform } from "../types/brandKitTypes";
import { PLATFORMS } from "../constants/brandKitConstants";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export const INITIAL_SOCIAL_LINKS: SocialLink[] = PLATFORMS.map((platform) => ({
  platform,
  url: "",
}));

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);

  const handleUpdateLink = (index: number, url: string) => {
    setLinks((prev) =>
      prev.map((link, currentIndex) =>
        currentIndex === index ? { ...link, url } : link,
      ),
    );
  };

  const handleUpdatePlatform = (index: number, platform: SocialPlatform) => {
    setLinks((prev) =>
      prev.map((link, currentIndex) =>
        currentIndex === index ? { ...link, platform } : link,
      ),
    );
  };

  const handleAddLink = () => {
    setLinks((prev) => prev);
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) =>
      prev.map((link, currentIndex) =>
        currentIndex === index ? { ...link, url: "" } : link,
      ),
    );
  };

  return {
    links,
    handleUpdateLink,
    handleUpdatePlatform,
    handleAddLink,
    handleRemoveLink,
    setLinks,
  };
}
