import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface TwilioSmsAccount {
  id: number;
  connectedChannelId: number;
  phoneNumber: string;
  twilioSid: string;
  isActive: boolean;
  monthlyPriceEur: number;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export const mapTwilioSmsAccountToFormData = (
  account: TwilioSmsAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.phoneNumber,
    configuration: {
      phoneNumber: account.phoneNumber,
      twilioSid: account.twilioSid,
      monthlyPriceEur: account.monthlyPriceEur,
      verificationStatus: account.verificationStatus,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      twilioSmsAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};
