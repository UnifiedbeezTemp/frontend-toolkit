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
  const email =
    (connection.configuration)?.email || connection.name || "Unknown Email";
  const displayName = (connection.configuration)?.displayName || "";
  const canReceive = (connection.configuration)?.canReceive ?? false;
  const canSend = (connection.configuration)?.canSend ?? false;
  const verificationStatus =
    (connection.configuration)?.verificationStatus || "PENDING";
  const provider = (connection.configuration)?.provider || "gmail";

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


