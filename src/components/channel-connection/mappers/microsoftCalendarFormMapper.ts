import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { MicrosoftCalendarAccount } from "../config/microsoft_calendar/types";

export const mapMicrosoftCalendarConnectionToFormData = (
  account: MicrosoftCalendarAccount
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
      microsoftCalendarAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

