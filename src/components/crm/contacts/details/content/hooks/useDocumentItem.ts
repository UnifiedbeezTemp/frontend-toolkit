"use client";

import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";
import { DocumentActivity } from "../types";

export const useDocumentItem = (
  document: DocumentActivity,
  contactAvatar: string,
  onPreview: () => void,
) => {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages();

  const getFileIconColor = () => {
    switch (document.type) {
      case "pdf":
        return "#F04438";
      case "image":
        return "#9D5BD2";
      case "video":
        return "#F79009";
      default:
        return "#667085";
    }
  };

  const getCategoryBadgeStyle = () => {
    return "border border-border text-text-secondary rounded-[0.4rem] px-[0.8rem] py-[0.2rem] text-[1.2rem]";
  };

  const avatarSrc =
    (contactAvatar && images[contactAvatar as keyof typeof images]) ||
    icons.userGreen;

  const uploaderAvatarRaw = document.uploadedBy.avatar;
  let uploaderAvatarSrc = icons.userGreen;

  if (uploaderAvatarRaw && images[uploaderAvatarRaw as keyof typeof images]) {
    uploaderAvatarSrc = images[uploaderAvatarRaw as keyof typeof images];
  } else if (
    typeof uploaderAvatarRaw === "string" &&
    uploaderAvatarRaw.startsWith("http")
  ) {
    uploaderAvatarSrc = uploaderAvatarRaw;
  }

  const actions = [
    { id: "view", icon: icons.eyeOn, onClick: onPreview },
    { id: "download", icon: icons.download, onClick: () => {} },
    { id: "info", icon: icons.infoOutline, onClick: () => {} },
  ];

  return {
    fileIconColor: getFileIconColor(),
    categoryBadgeStyle: getCategoryBadgeStyle(),
    icons,
    avatarSrc,
    uploaderAvatarSrc,
    actions,
  };
};
