export type SocialPlatform =
  | "Instagram"
  | "Facebook"
  | "X"
  | "LinkedIn"
  | "YouTube"
  | "Website";
export type FontWeight = "Light" | "Regular" | "Bold" | "Extra Bold";
export type FontStyle = "Normal" | "Italic";

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
  accents: string[];
}

export interface BrandColorsState {
  light: ModeColorState;
  dark: ModeColorState;
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
  accents: string[];
  onColorChange: (field: "primary" | "background", color: string) => void;
  onAccentAdd: () => void;
  onAccentUpdate: (index: number, color: string) => void;
  onAccentRemove: (index: number) => void;
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

export interface AccentColorsProps {
  accents: string[];
  onAdd: () => void;
  onUpdate: (index: number, color: string) => void;
  onRemove: (index: number) => void;
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
  colorHandlers: {
    light: ModeColorsProps;
    dark: ModeColorsProps;
    button: ButtonColorsProps;
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
  onImportBrandKit: (data: Partial<BrandKitState>) => void;
}
