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
  const configuration = connection.configuration as Record<string, unknown>;

  const email =
    (typeof configuration.email === "string" ? configuration.email : null) ||
    connection.name ||
    "Unknown Email";
  const displayName =
    typeof configuration.displayName === "string" ? configuration.displayName : "";
  const canReceive =
    typeof configuration.canReceive === "boolean" ? configuration.canReceive : false;
  const canSend =
    typeof configuration.canSend === "boolean" ? configuration.canSend : false;
  const verificationStatus =
    typeof configuration.verificationStatus === "string"
      ? configuration.verificationStatus
      : "PENDING";
  const provider =
    typeof configuration.provider === "string" ? configuration.provider : "gmail";

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

