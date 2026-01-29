export interface MicrosoftCalendarAccount {
  id: number;
  connectedChannelId: number;
  displayName: string;
  provider: string;
  email: string;
  sharedCredentialId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

