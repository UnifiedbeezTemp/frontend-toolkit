import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { GoogleCalendarAccount } from "../config/google_calendar/types";

export const mapGoogleCalendarConnectionToFormData = (
  account: GoogleCalendarAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.email,
    configuration: {
      email: account.email,
      fullName: account.displayName,
      provider: account.provider,
      verificationStatus: account.verificationStatus,
      connectedChannelId: account.connectedChannelId,
      googleCalendarAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

