import { SocialLink, SocialPlatform } from "../types/brandKitTypes";

export interface InvalidSocialLink {
  index: number;
  platform: SocialPlatform;
}

const SOCIAL_PLATFORM_HOST_PATTERNS: Record<
  Exclude<SocialPlatform, "WhatsApp">,
  RegExp
> = {
  Instagram: /(^|\.)instagram\.com$/i,
  X: /(^|\.)x\.com$|(^|\.)twitter\.com$/i,
  YouTube: /(^|\.)youtube\.com$|(^|\.)youtu\.be$/i,
  Facebook: /(^|\.)facebook\.com$/i,
  LinkedIn: /(^|\.)linkedin\.com$/i,
};

const WHATSAPP_HOST_PATTERN = /(^|\.)wa\.me$|(^|\.)whatsapp\.com$/i;
const WHATSAPP_PHONE_PATTERN = /^\+?[0-9()\-\s]{7,}$/;

const parseHttpUrl = (value: string) => {
  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
};

const isValidWhatsAppValue = (value: string) => {
  const digitsOnly = value.replace(/[^\d]/g, "");

  if (WHATSAPP_PHONE_PATTERN.test(value) && digitsOnly.length >= 7) {
    return true;
  }

  const url = parseHttpUrl(value);
  if (!url) return false;

  return WHATSAPP_HOST_PATTERN.test(url.hostname.toLowerCase());
};

export const isValidSocialLinkValue = (
  platform: SocialPlatform,
  value: string,
) => {
  const trimmed = value.trim();

  if (!trimmed) return true;

  if (platform === "WhatsApp") {
    return isValidWhatsAppValue(trimmed);
  }

  const url = parseHttpUrl(trimmed);
  if (!url) return false;

  return SOCIAL_PLATFORM_HOST_PATTERNS[platform].test(
    url.hostname.toLowerCase(),
  );
};

export const getInvalidSocialLinks = (
  links: SocialLink[],
): InvalidSocialLink[] =>
  links.flatMap((link, index) =>
    isValidSocialLinkValue(link.platform, link.url)
      ? []
      : [{ index, platform: link.platform }],
  );

const formatSocialPlatformList = (links: InvalidSocialLink[]) => {
  const labels = links.map((link) => link.platform);

  if (labels.length <= 1) return labels[0] ?? "";
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;

  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
};

export const getInvalidSocialLinkMessage = (links: InvalidSocialLink[]) => {
  const names = formatSocialPlatformList(links);

  if (!names) return "";

  return `${names} ${links.length === 1 ? "link is" : "links are"} invalid.`;
};

export const getSocialLinkFieldError = (platform: SocialPlatform) =>
  platform === "WhatsApp"
    ? "Enter a valid WhatsApp URL or phone number."
    : `Enter a valid ${platform} URL.`;
