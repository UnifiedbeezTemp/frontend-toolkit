import { WebchatFormData } from "../hooks/useWebchatConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<WebchatFormData>
): WebchatFormData {
  const websiteUrl = watch("websiteUrl");

  return {
    websiteUrl: typeof websiteUrl === "string" ? websiteUrl : "",
  };
}

