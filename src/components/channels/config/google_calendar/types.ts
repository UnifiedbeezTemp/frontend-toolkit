import { GoogleCalendarConnectResponse } from "../../../../services/googleCalendarService";

export interface GoogleCalendarConfigProps {
  onComplete?: (response: GoogleCalendarConnectResponse) => void;
  onRefetchChannels?: () => void;
}

export interface GoogleCalendarAccount {
  displayName: string;
  id: number;
  connectedChannelId: number;
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

