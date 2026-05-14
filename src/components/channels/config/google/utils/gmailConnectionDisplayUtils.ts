import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface GmailDisplayData {
  email: string;
  displayName: string;
  canReceive: boolean;
  canSend: boolean;
  verificationStatus: string;
  provider: string;
}

export interface GmailStatusColors {
  text: string;
  bg: string;
}

export const extractGmailDisplayData = (
  connection: ChannelConnection
): GmailDisplayData => {
  const config = connection.configuration ?? {};
  const emailFromConfig = typeof config["email"] === "string" ? config["email"] : "";
  const displayNameFromConfig =
    typeof config["displayName"] === "string" ? config["displayName"] : "";
  const canReceiveFromConfig =
    typeof config["canReceive"] === "boolean" ? config["canReceive"] : false;
  const canSendFromConfig =
    typeof config["canSend"] === "boolean" ? config["canSend"] : false;
  const verificationStatusFromConfig =
    typeof config["verificationStatus"] === "string"
      ? config["verificationStatus"]
      : "PENDING";
  const providerFromConfig =
    typeof config["provider"] === "string" ? config["provider"] : "gmail";

  const email = emailFromConfig || connection.name || "Unknown Email";
  const displayName = displayNameFromConfig;
  const canReceive = canReceiveFromConfig;
  const canSend = canSendFromConfig;
  const verificationStatus = verificationStatusFromConfig;
  const provider = providerFromConfig;

  return {
    email,
    displayName,
    canReceive,
    canSend,
    verificationStatus,
    provider,
  };
};

export const getGmailStatusColors = (status: string): GmailStatusColors => {
  switch (status.toUpperCase()) {
    case "VERIFIED":
      return { text: "text-success", bg: "bg-success" };
    case "PENDING":
      return { text: "text-warning", bg: "bg-warning" };
    case "FAILED":
      return { text: "text-error", bg: "bg-error" };
    default:
      return { text: "text-text-secondary", bg: "bg-inactive-color" };
  }
};

export const getGmailStatusText = (status: string): string => {
  switch (status.toUpperCase()) {
    case "VERIFIED":
      return "Verified";
    case "PENDING":
      return "Pending Verification";
    case "FAILED":
      return "Verification Failed";
    default:
      return status;
  }
};

