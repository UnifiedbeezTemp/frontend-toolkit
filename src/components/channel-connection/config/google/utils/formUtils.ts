import { GoogleFormData } from "../hooks/useGoogleConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<GoogleFormData>,
  readConfirmation: boolean
): GoogleFormData {
  const email = watch("email");

  return {
    email: typeof email === "string" ? email : "",
    readConfirmation,
  };
}

export function getDisplayEmail(
  watch: UseFormWatch<GoogleFormData>
): string {
  const email = watch("email");
  if (typeof email === "string" && email.length > 0) {
    return email;
  }
  return "";
}

