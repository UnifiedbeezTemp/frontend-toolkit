export interface Session {
  id: string;
  createdAt: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  isCurrent: boolean;
  lastActiveAt: string;
  location: string;
  loginMethod: string;
  twoFactorVerified: boolean;
}

export interface SessionsResponse {
  sessions: Session[];
}
