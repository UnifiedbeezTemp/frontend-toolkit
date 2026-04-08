import type { ReactNode } from "react";
import type { BrandDetectionResponse } from "../../../types/brandKitApiTypes";
import type { FontWeight } from "../types/brandKitTypes";

export type BrandKitDetectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: BrandDetectionResponse | null;
};

export type DetectionFontKind = "header" | "body";

export type DetectionFontItem = {
  kind: DetectionFontKind;
  label: string;
  family: string;
  weight: FontWeight | null;
};

export type DetectionColorId = "primary" | "accent" | "background" | "button";

export type DetectionColorItem = {
  id: DetectionColorId;
  label: string;
  value: string;
  rgb: string | null;
};

export type DetectionSocialId =
  | "instagram"
  | "twitter"
  | "facebook"
  | "linkedin"
  | "youtube";

export type DetectionSocialIconKey =
  | "igIcon"
  | "twitterIcon"
  | "fbIcon"
  | "linkedinIcon"
  | "youtubeIcon";

export type DetectionSocialItem = {
  id: DetectionSocialId;
  label: string;
  url: string;
  iconKey: DetectionSocialIconKey;
};

export type BrandKitDetectionViewModel = {
  logoUrl: string | null;
  fonts: DetectionFontItem[];
  colors: DetectionColorItem[];
  socials: DetectionSocialItem[];
};

export type BrandKitDetectionSection =
  | { id: "logo"; logoUrl: string }
  | { id: "fonts"; fonts: DetectionFontItem[] }
  | { id: "colors"; colors: DetectionColorItem[] }
  | { id: "socials"; socials: DetectionSocialItem[] }
  | { id: "empty" };

export type BrandKitDetectionModalContentProps = {
  isOpen: boolean;
  onDone: () => void;
  data: BrandDetectionResponse | null;
};

export type DetectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export type DetectionSectionCardProps = {
  title: string;
  iconSrc?: string;
  iconAlt?: string;
  children: ReactNode;
  className?: string;
};

export type DetectionLogoSectionProps = {
  logoUrl: string;
};

export type DetectionTypographySectionProps = {
  fonts: DetectionFontItem[];
};

export type DetectionFontCardProps = {
  item: DetectionFontItem;
  delay: number;
};

export type DetectionColorsSectionProps = {
  colors: DetectionColorItem[];
};

export type DetectionSocialsSectionProps = {
  socials: DetectionSocialItem[];
};

export type DetectionSectionRendererProps = {
  section: BrandKitDetectionSection;
};
