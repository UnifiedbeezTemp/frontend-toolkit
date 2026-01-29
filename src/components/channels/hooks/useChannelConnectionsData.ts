import { useWebchatConnections } from "./useWebchatConnections";
import { mapWebchatConnectionToDisplay } from "../mappers/webchatConnectionMapper";
import { useMemo } from "react";
import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ConnectionDisplayData } from "../connections/types";

interface GmailAccount {
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

interface CalendarAccount {
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

interface FacebookAccount {
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

interface WhatsAppAccount {
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

interface TwilioSmsAccount {
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

interface TelegramAccount {
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

interface PayPalAccount {
  id: number;
  connectedChannelId: number;
  paypalMerchantId: string;
  email: string;
  accountStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CalendlyAccount {
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

interface ZoomAccount {
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

interface ShopifyAccount {
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

export const useChannelConnectionsData = (channel?: Channel | null) => {
  const channelName = channel?.availableChannel?.name;
  const isWebchat = channelName === "webchat";

  const {
    connections: webchatConnections,
    isLoading: isWebchatLoading,
    error: webchatError,
    refetch: refetchWebchat,
    isFetching: isWebchatFetching,
  } = useWebchatConnections({ enabled: isWebchat });

  const mappedConnections = useMemo(() => {
    if (!channel) return [];

    if (channelName === "webchat") {
      if (
        !webchatConnections?.webchats ||
        !Array.isArray(webchatConnections.webchats) ||
        webchatConnections.webchats.length === 0
      ) {
        return [];
      }
      return webchatConnections.webchats
        .map(mapWebchatConnectionToDisplay)
        .filter((conn): conn is ConnectionDisplayData => conn !== null);
    }

    if (channelName === "gmail") {
      const accounts = ((channel as Channel).emailAccounts ||
        []) as unknown as GmailAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.email || "Gmail Account";
        const subtitle = account.displayName || account.provider || "Gmail";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: account.provider,
            canReceive: account.canReceive,
            canSend: account.canSend,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }

    if (channelName === "google_calendar") {
      const accounts = ((channel as Channel).calendarAccounts ||
        []) as unknown as CalendarAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.email || "Google Calendar Account";
        const subtitle = account.provider || "Google Calendar";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "google_calendar",
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            sharedCredentialId: account.sharedCredentialId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }

    if (channelName === "microsoft_calendar") {
      const accounts = ((channel as Channel).calendarAccounts ||
        []) as unknown as CalendarAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.email || "Microsoft Calendar Account";
        const subtitle = account.provider || "Microsoft Calendar";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "microsoft_calendar",
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            sharedCredentialId: account.sharedCredentialId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }

    if (channelName === "custom_email") {
      const accounts = ((channel as Channel).emailAccounts ||
        []) as unknown as GmailAccount[];
      return accounts
        .filter((account) => account.provider === "custom")
        .map<ConnectionDisplayData>((account) => {
          const title =
            account.displayName ||
            account.customDomain ||
            account.email ||
            "Custom Email Account";
          const subtitle =
            account.customDomain || account.email || "Custom Email";
          return {
            id: account.id,
            title,
            subtitle,
            isActive: Boolean(account.isActive),
            isConnected: Boolean(account.isActive),
            metadata: {
              provider: account.provider,
              email: account.email,
              customDomain: account.customDomain,
              displayName: account.displayName,
              canReceive: account.canReceive,
              canSend: account.canSend,
              verificationStatus: account.verificationStatus,
              connectedChannelId: account.connectedChannelId,
            },
          };
        });
    }

    if (channelName === "facebook_messenger") {
      const accounts = ((channel as Channel).facebookAccounts ||
        []) as unknown as FacebookAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.pageName || "Facebook Page";
        const subtitle =
          account.accountType === "messenger"
            ? "Facebook Messenger"
            : "Facebook";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "facebook_messenger",
            pageId: account.pageId,
            accountType: account.accountType,
            instagramAccountId: account.instagramAccountId,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }

    if (channelName === "whatsapp") {
      const accounts = ((channel as Channel).whatsappAccounts ||
        []) as unknown as WhatsAppAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title =
          account.verifiedName ||
          account.businessName ||
          account.displayPhoneNumber ||
          "WhatsApp Account";
        const subtitle = account.displayPhoneNumber || "WhatsApp Business";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "whatsapp",
            phoneNumberId: account.phoneNumberId,
            wabaId: account.wabaId,
            businessId: account.businessId,
            displayPhoneNumber: account.displayPhoneNumber,
            verifiedName: account.verifiedName,
            businessName: account.businessName,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }
    if (channelName === "twilio_sms") {
      const accounts = ((channel as Channel).smsAccounts ||
        []) as unknown as TwilioSmsAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.phoneNumber || "Twilio SMS Account";
        const subtitle = "Twilio SMS";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "twilio_sms",
            phoneNumber: account.phoneNumber,
            twilioSid: account.twilioSid,
            monthlyPriceEur: account.monthlyPriceEur,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }

    if (channelName === "outlook") {
      const accounts = ((channel as Channel).emailAccounts ||
        []) as unknown as CalendarAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.email || "Outlook Account";
        const subtitle = account.provider || "Outlook";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "outlook",
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            sharedCredentialId: account.sharedCredentialId,
            verifiedAt: account.verifiedAt,
            verificationAttempts: account.verificationAttempts,
            verificationError: account.verificationError,
          },
        };
      });
    }

    if (channelName === "instagram_direct") {
      const accounts = ((channel as Channel).facebookAccounts ||
        []) as unknown as FacebookAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.pageName || "Instagram Page";
        const subtitle = "Instagram Direct";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "instagram_direct",
            pageId: account.pageId,
            accountType: account.accountType,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            verifiedAt: account.verifiedAt,
          },
        };
      });
    }

    if (channelName === "telegram") {
      const accounts = ((channel as Channel).telegramAccounts ||
        []) as unknown as TelegramAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title =
          account.displayName || account.username || "Telegram Account";
        const subtitle = account.phoneNumber
          ? `+${account.phoneNumber}`
          : "Telegram";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "telegram",
            telegramUserId: account.telegramUserId,
            displayName: account.displayName,
            username: account.username,
            phoneNumber: account.phoneNumber,
            verificationStatus: account.verificationStatus,
            connectedChannelId: account.connectedChannelId,
            verifiedAt: account.verifiedAt,
          },
        };
      });
    }

    if (channelName === "paypal") {
      const accounts = ((channel as Channel).paypalAccounts ||
        []) as unknown as PayPalAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.email || "PayPal Account";
        const subtitle = "PayPal";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "paypal",
            paypalMerchantId: account.paypalMerchantId,
            email: account.email,
            accountStatus: account.accountStatus,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }

    if (channelName === "calendly") {
      const accounts = ((channel as Channel).calendlyAccounts ||
        []) as unknown as CalendlyAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title =
          account.displayName || account.email || "Calendly Account";
        const subtitle = account.email || "Calendly";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "calendly",
            calendlyUserUri: account.calendlyUserUri,
            displayName: account.displayName,
            email: account.email,
            timezone: account.timezone,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }
    if (channelName === "zoom") {
      const accounts = ((channel as Channel).zoomAccounts ||
        []) as unknown as ZoomAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.displayName || account.email || "Zoom Account";
        const subtitle = account.email || "Zoom";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "zoom",
            zoomUserId: account.zoomUserId,
            displayName: account.displayName,
            email: account.email,
            accountId: account.accountId,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }

    if (channelName === "shopify") {
      const accounts = ((channel as Channel).shopifyAccounts ||
        []) as unknown as ShopifyAccount[];
      return accounts.map<ConnectionDisplayData>((account) => {
        const title = account.shopName || account.shopDomain || "Shopify Store";
        const subtitle = account.shopDomain || "Shopify";
        return {
          id: account.id,
          title,
          subtitle,
          isActive: Boolean(account.isActive),
          isConnected: Boolean(account.isActive),
          metadata: {
            provider: "shopify",
            shopDomain: account.shopDomain,
            shopName: account.shopName,
            shopEmail: account.shopEmail,
            shopifyStoreId: account.shopifyStoreId,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }

    return [];
  }, [channel, channelName, webchatConnections]);

  if (!channel) {
    return {
      connections: [] as ConnectionDisplayData[],
      isLoading: false,
      error: null,
      refetch: () => {},
      isFetching: false,
    };
  }

  if (isWebchat) {
    return {
      connections: mappedConnections,
      isLoading: isWebchatLoading,
      error: webchatError,
      refetch: refetchWebchat,
      isFetching: isWebchatFetching,
    };
  }

  return {
    connections: mappedConnections,
    isLoading: false,
    error: null,
    refetch: () => {},
    isFetching: false,
  };
};
