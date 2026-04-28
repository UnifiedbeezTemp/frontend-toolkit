import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface CalendlyDisplayData {
  email: string;
  displayName: string;
  timezone: string;
  calendlyUserUri: string;
}

export const extractCalendlyDisplayData = (
  connection: ChannelConnection,
): CalendlyDisplayData => {
  const config = (connection.configuration as Record<string, unknown>) || {};

  return {
    email: (config.email as string) || "",
    displayName: (config.displayName as string) || "",
    timezone: (config.timezone as string) || "",
    calendlyUserUri: (config.calendlyUserUri as string) || "",
  };
};
