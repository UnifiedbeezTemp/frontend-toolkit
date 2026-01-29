import { FacebookFormData } from "../hooks/useFacebookConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<FacebookFormData>,
  readConfirmation: boolean,
  profileImage: File | null,
  profileImageUrl: string | null
): FacebookFormData {
  const name = watch("name");
  const imageUrl = profileImage
    ? URL.createObjectURL(profileImage)
    : profileImageUrl || null;

  return {
    name: typeof name === "string" ? name : "",
    readConfirmation,
    profileImageUrl: imageUrl,
  };
}

export function getDisplayNameInitial(
  watch: UseFormWatch<FacebookFormData>
): string {
  const name = watch("name");
  if (typeof name === "string" && name.length > 0) {
    return name.charAt(0).toUpperCase();
  }
  return "FB";
}

