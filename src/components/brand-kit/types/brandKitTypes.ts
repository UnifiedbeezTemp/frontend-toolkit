export type SocialPlatform =
  | "Instagram"
  | "WhatsApp"
  | "X"
  | "YouTube"
  | "Facebook"
  | "LinkedIn"
export type FontWeight = "400" | "500" | "600" | "700"
export type FontStyle = "Normal" | "Italic"

import { type BrandKitErrorResponse } from "../../../types/brandKitApiTypes"

export interface FontState {
  family: string
  weight: FontWeight
  style: FontStyle
}

export interface BrandFontState {
  header: FontState
  body: FontState
  scale: TypographyScaleState
}

export interface ModeColorState {
  primary: string
  background: string
}

export interface FontColorState {
  headingColor: string
  bodyColor: string
  linkColor: string
  mutedColor: string
}

export interface TypographyScaleState {
  h1: string
  h2: string
  h3: string
  body: string
}

export interface BrandColorsState {
  light: ModeColorState
  dark: ModeColorState
  accentColor: string
  button: ButtonColorState
  font: FontColorState
}

export interface ButtonColorState {
  color: string
  text: string
  stroke: string
}

export interface ButtonColorsProps {
  color: string
  text: string
  stroke: string
  onColorChange: (field: "color" | "text" | "stroke", color: string) => void
  disabled?: boolean
}

export interface SocialLinkItemProps {
  platform: SocialPlatform
  url: string
  onUrlChange: (url: string) => void
  onUrlBlur?: () => void
  onPlatformChange?: (platform: SocialPlatform) => void
  onDelete?: () => void
  isPlatformLocked?: boolean
  hideDelete?: boolean
  disabled?: boolean
  error?: string
}

export interface ModeColorsProps {
  mode: "Light" | "Dark"
  primary: string
  background: string
  onColorChange: (field: "primary" | "background", color: string) => void
  disabled?: boolean
}

export interface FontPickerItemProps {
  label: string
  family: string
  weight: FontWeight
  onFamilyChange: (family: string) => void
  onWeightChange: (weight: string) => void
  disabled?: boolean
}

export interface FontSelectorProps {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  className?: string
  isFamily?: boolean
  disabled?: boolean
}

export interface AccentColorProps {
  accentColor: string
  onAccentColorChange: (color: string) => void
  disabled?: boolean
}

export interface AccentColorsProps {
  accents: string[]
  onAdd: () => void
  onUpdate: (index: number, color: string) => void
  onRemove: (index: number) => void
}

export interface FontColorsProps {
  onColorChange: (field: keyof FontColorState, color: string) => void
  disabled?: boolean
}

export interface TypographyScaleProps {
  values: TypographyScaleState
  onScaleChange: (field: keyof TypographyScaleState, value: string) => void
  disabled?: boolean
}

export interface ColorPickerItemProps {
  label: string
  color: string
  onChange: (color: string) => void
  onDelete?: () => void
  className?: string
  disabled?: boolean
}

export interface BrandKitReadonlyState {
  id: string
  companyLogoUrl: string}

export interface BrandKitState {
  websiteUrl: string
  colors: BrandColorsState
  fonts: BrandFontState
  socialLinks: SocialLink[]
  logo: string | null
  readonlyFields: BrandKitReadonlyState
}

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface BrandKitContextType extends BrandKitState {
  isLoading: boolean
  isSaving: boolean
  isDeletingLogo: boolean
  isDetecting: boolean
  hasChanges: boolean
  error: BrandKitErrorResponse | null
  refetch: () => Promise<unknown>
  saveBrandKit: () => Promise<void>
  detectBrand: (websiteUrl: string) => Promise<void>
  revertChanges: () => void
  setWebsiteUrl: (websiteUrl: string) => void
  setDetectedFaviconUrl: (url: string) => void
  onImportBrandKit: (data: Partial<BrandKitState>) => void
  colorHandlers: {
    light: ModeColorsProps
    dark: ModeColorsProps
    button: ButtonColorsProps
    accent: AccentColorProps
    font: FontColorsProps
  }
  fontHandlers: {
    header: FontPickerItemProps
    body: FontPickerItemProps
    scale: TypographyScaleProps
  }
  socialHandlers: {
    onUpdateLink: (index: number, url: string) => void
    onUpdatePlatform: (index: number, platform: SocialPlatform) => void
    onAddLink: () => void
    onRemoveLink: (index: number) => void
  }
  logoHandlers: {
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemove: () => void
    triggerUpload: () => void
    fileInputRef: React.RefObject<HTMLInputElement | null>
  }
}
