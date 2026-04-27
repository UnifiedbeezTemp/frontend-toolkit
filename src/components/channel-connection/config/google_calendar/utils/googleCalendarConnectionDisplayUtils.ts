import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface GoogleCalendarDisplayData {
  email: string;
  provider: string;
  fullName: string;
  verificationStatus: string;
  isActive: boolean;
  connectedChannelId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GoogleCalendarStatusColors {
  text: string;
  bg: string;
}

export const extractGoogleCalendarDisplayData = (
  connection: ChannelConnection
): GoogleCalendarDisplayData => {
  console.log(connection);
  const email =
    (connection.configuration as Record<string, unknown>)?.email || connection.name || "Unknown Email";
  const fullName = (connection.configuration as Record<string, unknown>)?.fullName || "Unknown Name";
  const provider = (connection.configuration as Record<string, unknown>)?.provider || "google";
  const verificationStatus =
    (connection.configuration as Record<string, unknown>)?.verificationStatus || "PENDING";
  const isActive = connection.isActive ?? false;
  const connectedChannelId =
    (connection.configuration as Record<string, unknown>)?.connectedChannelId as number || 0;
  const createdAt = connection.createdAt || "";
  const updatedAt = connection.updatedAt || "";

  return {
    email: typeof email === "string" ? email : String(email ?? "Unknown Email"),
    fullName:  String(fullName),
    provider: typeof provider === "string" ? provider : "google",
    verificationStatus: typeof verificationStatus === "string" ? verificationStatus : "PENDING",
    isActive: Boolean(isActive),
    connectedChannelId: typeof connectedChannelId === "number" ? connectedChannelId : 0,
    createdAt,
    updatedAt,
  };
};

export const getGoogleCalendarStatusColors = (status: string): GoogleCalendarStatusColors => {
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

export const getGoogleCalendarStatusText = (status: string): string => {
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

