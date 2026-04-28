import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface GmailAccount {
  id: number;
  connectedChannelId: number;
  provider: string;
  email: string;
  displayName: string;
  sharedCredentialId: number | null;
  customDomain: string | null;
  isActive: boolean;
  canReceive: boolean;
  canSend: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export const mapGmailAccountToFormData = (
  account: GmailAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.email,
    configuration: {
      email: account.email,
      displayName: account.displayName,
      provider: account.provider,
      canReceive: account.canReceive,
      canSend: account.canSend,
      verificationStatus: account.verificationStatus,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      sharedCredentialId: account.sharedCredentialId,
      customDomain: account.customDomain,
      gmailAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

