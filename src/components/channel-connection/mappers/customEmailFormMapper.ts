import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface CustomEmailAccount {
  id: number;
  connectedChannelId: number;
  provider: string;
  email: string;
  displayName: string;
  sharedCredentialId: number | null;
  customDomain: string;
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

export const mapCustomEmailConnectionToFormData = (
  account: CustomEmailAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.displayName || account.customDomain || account.email,
    configuration: {
      email: account.email,
      displayName: account.displayName,
      customDomain: account.customDomain,
      provider: account.provider,
      canReceive: account.canReceive,
      canSend: account.canSend,
      verificationStatus: account.verificationStatus,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      sharedCredentialId: account.sharedCredentialId,
      customEmailAccountId: account.id,
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

