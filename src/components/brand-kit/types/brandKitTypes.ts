export type SocialPlatform =
  | "Instagram"
  | "Facebook"
  | "X"
  | "LinkedIn"
  | "YouTube"
  | "Website";
export type FontWeight = "400" | "500" | "600" | "700";
export type FontStyle = "Normal" | "Italic";

import {
  type BrandKitErrorResponse,
} from "../../../types/brandKitApiTypes";

export interface FontState {
  family: string;
  weight: FontWeight;
  style: FontStyle;
}

export interface BrandFontState {
  header: FontState;
  body: FontState;
}

export interface ModeColorState {
  primary: string;
  background: string;
}

export interface BrandColorsState {
  light: ModeColorState;
  dark: ModeColorState;
  accentColor: string;
  button: ButtonColorState;
}

export interface ButtonColorState {
  color: string;
  background: string;
  stroke: string;
}

export interface ButtonColorsProps {
  color: string;
  background: string;
  stroke: string;
  onColorChange: (
    field: "color" | "background" | "stroke",
    color: string,
  ) => void;
}

export interface SocialLinkItemProps {
  platform: SocialPlatform;
  url: string;
  onUrlChange: (url: string) => void;
  onPlatformChange: (platform: SocialPlatform) => void;
  onDelete: () => void;
}

export interface ModeColorsProps {
  mode: "Light" | "Dark";
  primary: string;
  background: string;
  onColorChange: (field: "primary" | "background", color: string) => void;
}

export interface FontPickerItemProps {
  label: string;
  family: string;
  weight: FontWeight;
  onFamilyChange: (family: string) => void;
  onWeightChange: (weight: string) => void;
}

export interface FontSelectorProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  className?: string;
  isFamily?: boolean;
}

export interface AccentColorProps {
  accentColor: string;
  onAccentColorChange: (color: string) => void;
}

export interface ColorPickerItemProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  onDelete?: () => void;
  className?: string;
}

export interface BrandKitState {
  colors: BrandColorsState;
  fonts: BrandFontState;
  socialLinks: SocialLink[];
  logo: string | null;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface BrandKitContextType extends BrandKitState {
  isLoading: boolean;
  isSaving: boolean;
  isDeletingLogo: boolean;
  isDetecting: boolean;
  hasChanges: boolean;
  error: BrandKitErrorResponse | null;
  refetch: () => Promise<unknown>;
  saveBrandKit: () => Promise<void>;
  detectBrand: (websiteUrl: string) => Promise<void>;
  revertChanges: () => void;
  onImportBrandKit: (data: Partial<BrandKitState>) => void;
  colorHandlers: {
    light: ModeColorsProps;
    dark: ModeColorsProps;
    button: ButtonColorsProps;
    accent: AccentColorProps;
  };
  fontHandlers: {
    header: FontPickerItemProps;
    body: FontPickerItemProps;
  };
  socialHandlers: {
    onUpdateLink: (index: number, url: string) => void;
    onUpdatePlatform: (index: number, platform: SocialPlatform) => void;
    onAddLink: () => void;
    onRemoveLink: (index: number) => void;
  };
  logoHandlers: {
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    triggerUpload: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
  };
}
