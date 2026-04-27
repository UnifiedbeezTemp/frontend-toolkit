export interface BackendChannel {
  id: number;
  name: string;
  displayName: string;
  description: string;
  category: string;
  channelType: string;
  isActive: boolean;
  comingSoon: boolean;
  requiresPlan: string[];
  requiresAddon: string | null;
  createdAt: string;
  updatedAt: string;
  isSelected: boolean;
  access: {
    allowed: boolean;
    blockedBy: string | null;
    requiredPlans: string[] | null;
    requiredAddon: string | null;
    reason: string | null;
  };
}

export interface ChannelLimits {
  current?: number;
  max?: number;
  unlimited?: boolean;
  remaining?: number;
  message?: string;
}

export interface ChannelCategory {
  channels: BackendChannel[];
  available?: BackendChannel[];
  limits: ChannelLimits;
}

export interface ChannelsApiResponse {
  userPlan: string;
  categories: {
    communication: ChannelCategory;
    crmCalendar: ChannelCategory;
    ecommerce: ChannelCategory;
    upcoming: ChannelCategory;
    upcomingchannels?: ChannelCategory;
  };
}

export interface SelectedChannel {
  id: number;
  userId: number;
  availableChannelId: number;
  channelName: string;
  isActive: boolean;
  isConnected: boolean;
  credentials: unknown;
  connectedAt: string | null;
  lastSyncAt: string | null;
  canReceive: boolean;
  canSend: boolean;
  verificationStatus: string;
  verificationStartedAt: string | null;
  verifiedAt: string | null;
  verificationExpiresAt: string | null;
  verificationError: string | null;
  verificationAttempts: number;
  lastVerificationAttempt: string | null;
  verificationMetadata: unknown;
  credentialsEncrypted: boolean;
  encryptionIv: string | null;
  encryptionTag: string | null;
  provider: string | null;
  sharedCredentialId: number | null;
  availableChannel: BackendChannel;
  whatsappAccounts: unknown[];
  facebookAccounts: unknown[];
  emailAccounts: unknown[];
  smsAccounts: unknown[];
  calendarAccounts: unknown[];
  webchatConfigs: unknown[];
  liveChatConfigs: unknown[];
  telegramAccounts: unknown[];
  paypalAccounts: unknown[];
  calendlyAccounts: unknown[];
  zoomAccounts: unknown[];
  shopifyAccounts: unknown[];
}

export interface GroupedChannelAccount {
  id: number;
  type: string;
  displayName: string;
}

export interface GroupedChannelEntry {
  channelId: number;
  channelName: string;
  channelType: string;
  isActive: boolean;
  isConnected: boolean;
  accounts: GroupedChannelAccount[];
}

export interface SelectedChannelsResponse {
  channels: SelectedChannel[];
  grouped?: Record<string, GroupedChannelEntry[]>;
}

export interface WabaConfigResponse {
  appId: string;
  configId: string;
  version: string;
}

export interface WabaSetupInitResponse {
  token: string;
}

export interface WabaSignupData {
  phoneNumberId: string;
  wabaId: string;
  businessId: string;
}

export interface WabaCallbackRequest {
  code: string;
  signupData: WabaSignupData;
}

export interface WabaChannel {
  id: number;
  name: string;
  phoneNumber: string;
  verifiedName: string;
  businessName: string;
  isActive: boolean;
  connectedAt: string;
}

export interface WabaCallbackResponse {
  success: boolean;
  channelId?: number;
  wabaData?: {
    phoneNumber: string;
    verifiedName: string;
    wabaId: string;
    businessId: string;
  };
  channel?: WabaChannel;
  message?: string;
}
