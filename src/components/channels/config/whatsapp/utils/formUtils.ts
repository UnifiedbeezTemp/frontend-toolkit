import { WhatsAppFormData } from "../hooks/useWhatsAppConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<WhatsAppFormData>,
  readConfirmation: boolean,
  profileImage: File | null,
  profileImageUrl: string | null,
): WhatsAppFormData {
  const internalName = watch("internalName");
  const displayName = watch("displayName");
  const phoneNumber = watch("phoneNumber");
  const description = watch("description");
  const info = watch("info");
  const imageUrl = profileImage
    ? URL.createObjectURL(profileImage)
    : profileImageUrl || null;

  return {
    internalName: typeof internalName === "string" ? internalName : "",
    displayName: typeof displayName === "string" ? displayName : "",
    phoneNumber: typeof phoneNumber === "string" ? phoneNumber : "",
    description: typeof description === "string" ? description : "",
    info: typeof info === "string" ? info : "",
    readConfirmation,
    profileImageUrl: imageUrl,
  };
}

export function getDisplayNameInitial(
  watch: UseFormWatch<WhatsAppFormData>,
): string {
  const displayName = watch("displayName");
  if (typeof displayName === "string" && displayName.length > 0) {
    return displayName.charAt(0).toUpperCase();
  }
  return "WC";
}
