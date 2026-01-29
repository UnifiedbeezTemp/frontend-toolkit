export interface CustomEmailAccount {
  id: number;
  connectedChannelId: number;
  domain: string;
  provider: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export interface DNSRecord {
  type: string;
  name: string;
  value: string;
  priority?: number;
}

