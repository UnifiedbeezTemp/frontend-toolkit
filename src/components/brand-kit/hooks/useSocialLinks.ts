"use client";

import { useState } from "react";
import { SocialPlatform } from "../types/brandKitTypes";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([
    { platform: "Instagram", url: "" },
  ]);

  const handleUpdateLink = (index: number, url: string) => {
    const newLinks = [...links];
    newLinks[index].url = url;
    setLinks(newLinks);
  };

  const handleUpdatePlatform = (index: number, platform: SocialPlatform) => {
    const newLinks = [...links];
    newLinks[index].platform = platform;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { platform: "Instagram", url: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
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
