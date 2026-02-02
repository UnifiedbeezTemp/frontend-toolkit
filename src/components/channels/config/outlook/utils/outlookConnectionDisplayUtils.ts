import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface OutlookDisplayData {
  email: string;
  displayName: string;
}

export const extractOutlookDisplayData = (
  connection: ChannelConnection
): OutlookDisplayData => {
  const email =
    (connection.configuration as Record<string, unknown>)?.email ||
    connection.name ||
    "";
  const displayName =
    (connection.configuration as Record<string, unknown>)?.displayName || "";

  return {
    email: typeof email === "string" ? email : "",
    displayName: typeof displayName === "string" ? displayName : "",
  };
};
