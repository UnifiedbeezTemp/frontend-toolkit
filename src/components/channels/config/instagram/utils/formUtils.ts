import { InstagramFormData } from "../hooks/useInstagramConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<InstagramFormData>,
  readConfirmation: boolean,
  quickReactions: boolean,
  mentions: boolean,
  conversationStarters: boolean,
  profileImage: File | null,
  profileImageUrl: string | null
): InstagramFormData {
  const profileName = watch("profileName");
  const imageUrl = profileImage
    ? URL.createObjectURL(profileImage)
    : profileImageUrl || null;

  return {
    profileName: typeof profileName === "string" ? profileName : "",
    readConfirmation,
    quickReactions,
    mentions,
    conversationStarters,
    profileImageUrl: imageUrl,
  };
}

export function getDisplayNameInitial(
  watch: UseFormWatch<InstagramFormData>
): string {
  const profileName = watch("profileName");
  if (typeof profileName === "string" && profileName.length > 0) {
    return profileName.charAt(0).toUpperCase();
  }
  return "IG";
}

