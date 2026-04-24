import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface MicrosoftCalendarDisplayData {
  email: string;
  provider: string;
  fullName: string;
  verificationStatus: string;
  isActive: boolean;
  connectedChannelId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MicrosoftCalendarStatusColors {
  text: string;
  bg: string;
}

export const extractMicrosoftCalendarDisplayData = (
  connection: ChannelConnection
): MicrosoftCalendarDisplayData => {
  const email =
    (connection.configuration as Record<string, unknown>)?.email || connection.name || "Unknown Email";
  const fullName = (connection.configuration as Record<string, unknown>)?.fullName || "Unknown Name";
  const provider = (connection.configuration as Record<string, unknown>)?.provider || "microsoft";
  const verificationStatus =
    (connection.configuration as Record<string, unknown>)?.verificationStatus || "PENDING";
  const isActive = connection.isActive ?? false;
  const connectedChannelId =
    (connection.configuration as Record<string, unknown>)?.connectedChannelId as number || 0;
  const createdAt = connection.createdAt || "";
  const updatedAt = connection.updatedAt || "";
  return {
    email: String(email),
    provider: String(provider),
    verificationStatus: String(verificationStatus),
    isActive,
    connectedChannelId: Number(connectedChannelId),
    createdAt,
    updatedAt,
    fullName: String(fullName),
  };
};

export const getMicrosoftCalendarStatusColors = (status: string): MicrosoftCalendarStatusColors => {
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

export const getMicrosoftCalendarStatusText = (status: string): string => {
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

