"use client";

import React from "react";
import SocialLinkItem from "./social/SocialLinkItem";
import { useBrandKit } from "../../context/BrandKitContext";
import Heading from "../../../ui/Heading";
import {
  getInvalidSocialLinks,
  getSocialLinkFieldError,
  isValidSocialLinkValue,
} from "../../utils/socialLinkValidation";

const LINK_ERROR_TIMEOUT_MS = 4000;

export default function SocialLinks() {
  const { socialLinks, socialHandlers, isDetecting } = useBrandKit();
  const [visibleErrors, setVisibleErrors] = React.useState<
    Partial<Record<number, string>>
  >({});
  const errorTimeoutsRef = React.useRef<Partial<Record<number, number>>>({});
  const invalidLinkIndexes = React.useMemo(
    () => new Set(getInvalidSocialLinks(socialLinks).map(({ index }) => index)),
    [socialLinks],
  );

  const clearFieldError = React.useCallback((index: number) => {
    const timeoutId = errorTimeoutsRef.current[index];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete errorTimeoutsRef.current[index];
    }

    setVisibleErrors((prev) => {
      if (!prev[index]) return prev;

      const nextErrors = { ...prev };
      delete nextErrors[index];
      return nextErrors;
    });
  }, []);

  const showFieldError = React.useCallback(
    (index: number, message: string) => {
      clearFieldError(index);

      setVisibleErrors((prev) => ({
        ...prev,
        [index]: message,
      }));

      errorTimeoutsRef.current[index] = window.setTimeout(() => {
        setVisibleErrors((prev) => {
          if (!prev[index]) return prev;

          const nextErrors = { ...prev };
          delete nextErrors[index];
          return nextErrors;
        });

        delete errorTimeoutsRef.current[index];
      }, LINK_ERROR_TIMEOUT_MS);
    },
    [clearFieldError],
  );

  const handleLinkChange = React.useCallback(
    (index: number, url: string) => {
      clearFieldError(index);
      socialHandlers.onUpdateLink(index, url);
    },
    [clearFieldError, socialHandlers],
  );

  const handleLinkBlur = React.useCallback(
    (index: number) => {
      const link = socialLinks[index];
      if (!link) return;

      if (isValidSocialLinkValue(link.platform, link.url)) {
        clearFieldError(index);
        return;
      }

      showFieldError(index, getSocialLinkFieldError(link.platform));
    },
    [clearFieldError, showFieldError, socialLinks],
  );

  React.useEffect(() => {
    const activeTimeouts = errorTimeoutsRef.current;

    return () => {
      Object.values(activeTimeouts).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  return (
    <div className="pb-[4rem] flex flex-col gap-[2.4rem] pt-[1.6rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Social Links</Heading>
      </div>

      <div className="flex flex-col gap-[1.6rem]">
        {socialLinks.map((link, index) => (
          <SocialLinkItem
            key={link.platform}
            platform={link.platform}
            url={link.url}
            error={
              invalidLinkIndexes.has(index) ? visibleErrors[index] : undefined
            }
            disabled={isDetecting}
            isPlatformLocked
            hideDelete
            onUrlChange={(url: string) => handleLinkChange(index, url)}
            onUrlBlur={() => handleLinkBlur(index)}
          />
        ))}
      </div>
    </div>
  );
}
