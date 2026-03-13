import {
  BrandKitState,
  BrandColorsState,
  BrandFontState,
  SocialLink,
} from "../types/brandKitTypes";

export const MOCK_BRAND_DATA: Partial<BrandKitState> = {
  colors: {
    light: {
      primary: "#0A84FF",
      background: "#FFFFFF",
    },
    dark: {
      primary: "#0A84FF",
      background: "#1C1C1E",
    },
    accentColor: "#007AFF",
    button: {
      color: "#FFFFFF",
      background: "#0A84FF",
      stroke: "#0A84FF",
    },
  },
  fonts: {
    header: {
      family: "Outfit",
      weight: "Bold",
      style: "Normal",
    },
    body: {
      family: "Inter",
      weight: "Regular",
      style: "Normal",
    },
  },
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/unifiedbeez" },
    { platform: "X", url: "https://x.com/unifiedbeez" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/unifiedbeez" },
  ],
  logo: "https://via.placeholder.com/150?text=Beez+Logo",
};
