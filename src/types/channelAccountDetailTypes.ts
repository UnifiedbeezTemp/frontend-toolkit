export interface GmailAccount {
  id: number;
  connectedChannelId: number;
  provider: string;
  email: string;
  displayName: string | null;
  isActive: boolean;
  canReceive?: boolean;
  canSend?: boolean;
  verificationStatus?: string;
  customDomain?: string;
}

export interface CalendarAccount {
  id: number;
  connectedChannelId: number;
  provider: string;
  email: string;
  sharedCredentialId: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export interface FacebookAccount {
  id: number;
  connectedChannelId: number;
  pageId: string;
  pageName: string;
  accountType: string;
  pageAccessToken: string;
  instagramAccountId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export interface WhatsAppAccount {
  id: number;
  connectedChannelId: number;
  phoneNumberId: string;
  wabaId: string;
  businessId: string;
  displayPhoneNumber: string;
  verifiedName: string;
  businessName: string;
  accessToken: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

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

export interface TelegramAccount {
  id: number;
  connectedChannelId: number;
  telegramUserId: string;
  sessionString: string;
  displayName: string;
  username: string;
  phoneNumber: string;
  isActive: boolean;
  verificationStatus: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayPalAccount {
  id: number;
  connectedChannelId: number;
  paypalMerchantId: string;
  email: string;
  accountStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalendlyAccount {
  id: number;
  connectedChannelId: number;
  calendlyUserUri: string;
  calendlyOrganizationUri: string | null;
  email: string;
  displayName: string;
  timezone: string;
  avatarUrl: string | null;
  currentPlan: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ZoomAccount {
  id: number;
  connectedChannelId: number;
  zoomUserId: string;
  email: string;
  displayName: string;
  accountId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyAccount {
  id: number;
  connectedChannelId: number;
  shopDomain: string;
  shopName: string;
  shopEmail: string;
  shopifyStoreId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LiveChatAccount {
  id: number;
  connectedChannelId: number;
  teamName: string | null;
  chatName: string | null;
  profilePic: string | null;
  readReceipts: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccountDisplayData {
  id: string | number;
  title: string;
  subtitle?: string;
  isActive: boolean;
  isConnected: boolean;
  metadata?: Record<string, unknown>;
}