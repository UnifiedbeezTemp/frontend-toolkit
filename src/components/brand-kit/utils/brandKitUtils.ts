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
  let fontWeight = 400;
  switch (weight) {
    case "Bold":
      fontWeight = 700;
      break;
    case "Extra Bold":
      fontWeight = 800;
      break;
    case "Light":
      fontWeight = 300;
      break;
    default:
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
