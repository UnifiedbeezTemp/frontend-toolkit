import {
  BrandKitState,
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
      color: "#0A84FF",
      text: "#FFFFFF",
      stroke: "#0A84FF",
    },
    font: {
      headingColor: "#111111",
      bodyColor: "#333333",
      linkColor: "#0066cc",
      mutedColor: "#888888",
    },
  },
  fonts: {
    header: {
      family: "Outfit",
      weight: "700",
      style: "Normal",
    },
    body: {
      family: "Inter",
      weight: "400",
      style: "Normal",
    },
    scale: {
      h1: "48px",
      h2: "36px",
      h3: "24px",
      body: "16px",
    },
  },
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/unifiedbeez" },
    { platform: "X", url: "https://x.com/unifiedbeez" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/unifiedbeez" },
  ],
  logo: "https://via.placeholder.com/150?text=Beez+Logo",
  detectedFaviconUrl: "https://via.placeholder.com/150?text=Beez+Logo",
  websiteUrl: "https://unifiedbeez.com",
  readonlyFields: {
    id: "1",
    userId: "1",
    companyLogoUrl: "",
    createdAt: "",
    updatedAt: "",
  },
};
