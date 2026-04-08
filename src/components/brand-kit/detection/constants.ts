import type { BrandDetectionResponse } from "../../../types/brandKitApiTypes";
import type {
  DetectionColorId,
  DetectionSocialIconKey,
  DetectionSocialId,
} from "./types";

export const DETECTION_COLOR_FIELDS = [
  {
    id: "primary",
    label: "Primary",
    key: "detectedPrimaryColor",
  },
  {
    id: "accent",
    label: "Accent",
    key: "detectedAccentColor",
  },
  {
    id: "background",
    label: "Background",
    key: "detectedBackgroundColor",
  },
  {
    id: "button",
    label: "Button",
    key: "detectedButtonColor",
  },
] as const satisfies readonly {
  id: DetectionColorId;
  label: string;
  key: keyof BrandDetectionResponse;
}[];

export const DETECTION_SOCIAL_FIELDS = [
  {
    id: "instagram",
    label: "Instagram",
    key: "instagram",
    iconKey: "igIcon",
  },
  {
    id: "twitter",
    label: "X",
    key: "twitter",
    iconKey: "twitterIcon",
  },
  {
    id: "facebook",
    label: "Facebook",
    key: "facebook",
    iconKey: "fbIcon",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    key: "linkedin",
    iconKey: "linkedinIcon",
  },
  {
    id: "youtube",
    label: "YouTube",
    key: "youtube",
    iconKey: "youtubeIcon",
  },
] as const satisfies readonly {
  id: DetectionSocialId;
  label: string;
  key: keyof BrandDetectionResponse;
  iconKey: DetectionSocialIconKey;
}[];

