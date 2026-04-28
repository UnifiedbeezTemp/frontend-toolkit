import { WebchatFormData } from "../hooks/useWebchatConfig";
import { UseFormWatch } from "react-hook-form";

export function prepareFormSubmitData(
  watch: UseFormWatch<WebchatFormData>
): WebchatFormData {
  const websiteUrl = watch("websiteUrl");
  const teamName = watch("teamName");
  const chatName = watch("chatName");
  const readReceipts = watch("readReceipts");
  const profilePic = watch("profilePic");

  return {
    websiteUrl: typeof websiteUrl === "string" ? websiteUrl : "",
    teamName: typeof teamName === "string" ? teamName : "",
    chatName: typeof chatName === "string" ? chatName : "",
    readReceipts: Boolean(readReceipts),
    profilePic: profilePic instanceof File ? profilePic : null,
  };
}
