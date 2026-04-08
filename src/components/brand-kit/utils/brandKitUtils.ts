export type IconsType = Record<string, string>;

export const getPlatformIcon = (platform: string, icons: IconsType) => {
  switch (platform) {
    case "Instagram":
      return icons.igIcon;
    case "Facebook":
      return icons.fbIcon;
    case "X":
      return icons.twitterIcon;
    case "LinkedIn":
      return icons.linkedinIcon;
    case "YouTube":
      return icons.youtubeIcon;
    default:
      return icons.link;
  }
};

export const getFontWeightStyle = (weight: string, style?: string) => {
  const lower = weight.trim().toLowerCase();
  const numeric = Number.parseInt(lower, 10);

  let fontWeight = 400;
  if (Number.isFinite(numeric)) {
    fontWeight = numeric;
  } else if (lower.includes("bold")) {
    fontWeight = 700;
  } else if (lower.includes("light")) {
    fontWeight = 400;
  } else {
    fontWeight = 400;
  }

  return {
    fontWeight,
    fontStyle: style?.toLowerCase() === "italic" ? "italic" : "normal",
  } as const;
};

export const getFontStyle = (isFamily: boolean | undefined, value: string) => {
  if (isFamily) {
    return { fontFamily: value };
  }
  return getFontWeightStyle(value);
};
