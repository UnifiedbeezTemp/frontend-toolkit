import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface CustomEmailDisplayData {
  email: string;
  displayName: string;
  customDomain: string;
  provider: string;
  canReceive: boolean;
  canSend: boolean;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export interface CustomEmailStatusColors {
  text: string;
  bg: string;
}

export const extractCustomEmailDisplayData = (
  connection: ChannelConnection
): CustomEmailDisplayData => {
  const email =
    (connection.configuration as Record<string, unknown>)?.email || connection.name || "Unknown Email";
  const displayName = (connection.configuration as Record<string, unknown>)?.displayName || "";
  const customDomain = (connection.configuration as Record<string, unknown>)?.customDomain || "";
  const provider = (connection.configuration as Record<string, unknown>)?.provider || "custom";
  const canReceive = (connection.configuration as Record<string, unknown>)?.canReceive ?? false;
  const canSend = (connection.configuration as Record<string, unknown>)?.canSend ?? false;
  const verificationStatus =
    (connection.configuration as Record<string, unknown>)?.verificationStatus || "PENDING";
  const verifiedAt = (connection.configuration as Record<string, unknown>)?.verifiedAt as string | null || null;
  const verificationAttempts = (connection.configuration as Record<string, unknown>)?.verificationAttempts as number || 0;
  const verificationError = (connection.configuration as Record<string, unknown>)?.verificationError as string | null || null;

  return {
    email: typeof email === "string" ? email : "",
    displayName: typeof displayName === "string" ? displayName : "",
    customDomain: typeof customDomain === "string" ? customDomain : "",
    provider: typeof provider === "string" ? provider : "custom",
    canReceive: typeof canReceive === "boolean" ? canReceive : false,
    canSend: typeof canSend === "boolean" ? canSend : false,
    verificationStatus: typeof verificationStatus === "string" ? verificationStatus : "PENDING",
    verifiedAt,
    verificationAttempts,
    verificationError,
  };
};

export const getCustomEmailStatusColors = (status: string): CustomEmailStatusColors => {
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

export const getCustomEmailStatusText = (status: string): string => {
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

