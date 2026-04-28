import { useMemo } from "react";
import { ConnectionDisplayData } from "../../components/channels/connections/types";
import {
  GmailAccount,
  CalendarAccount,
  FacebookAccount,
  WhatsAppAccount,
  TwilioSmsAccount,
  TelegramAccount,
  PayPalAccount,
  CalendlyAccount,
  ZoomAccount,
  ShopifyAccount,
  LiveChatAccount,
  StripeAccount,
} from "../../types/channelAccountDetailTypes";
import { SelectedChannel } from "../../types/channelApiTypes";

export const getChannelAccounts = (channel?: SelectedChannel | null) => {
  const accounts = useMemo(() => {
    if (!channel) return [];

    const channelName = channel?.availableChannel?.name;
    if (!channelName) return [];

    // LiveChat and Webchat
    if (channelName === "webchat" || channelName === "livechat") {
      const accountsList = (channel.liveChatConfigs || []) as LiveChatAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => {
        const title = account.teamName || account.chatName || "Live Chat";
        const subtitle = account.chatName || undefined;
        return {
          id: account.id,
          title,
          subtitle,
          isActive: channel.isActive,
          isConnected: channel.isConnected,
          metadata: {
            teamName: account.teamName,
            chatName: account.chatName,
            readReceipts: account.readReceipts,
            profilePic: account.profilePic,
            connectedChannelId: account.connectedChannelId,
          },
        };
      });
    }

    // Gmail / Google Workspace Email
    if (channelName === "gmail") {
      const accountsList = (channel.emailAccounts || []) as GmailAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.email || "Gmail Account",
        subtitle: account.displayName || account.provider || "Gmail",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: account.provider,
          canReceive: account.canReceive,
          canSend: account.canSend,
          verificationStatus: account.verificationStatus,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }

    // Google and Microsoft Calendars
    if (
      channelName === "google_calendar" ||
      channelName === "microsoft_calendar"
    ) {
      const accountsList = (channel.calendarAccounts ||
        []) as CalendarAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title:
          account.email ||
          `${channelName === "google_calendar" ? "Google" : "Microsoft"} Calendar Account`,
        subtitle:
          account.provider ||
          (channelName === "google_calendar"
            ? "Google Calendar"
            : "Microsoft Calendar"),
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: channelName,
          verificationStatus: account.verificationStatus,
          connectedChannelId: account.connectedChannelId,
          sharedCredentialId: account.sharedCredentialId,
          verifiedAt: account.verifiedAt,
          verificationAttempts: account.verificationAttempts,
          verificationError: account.verificationError,
        },
      }));
    }

    // Custom Email (SMTP/IMAP)
    if (channelName === "custom_email") {
      const accountsList = (channel.emailAccounts || []) as GmailAccount[];
      return accountsList
        .filter((account) => account.provider === "custom")
        .map<ConnectionDisplayData>((account) => ({
          id: account.id,
          title:
            account.displayName ||
            account.customDomain ||
            account.email ||
            "Custom Email Account",
          subtitle: account.customDomain || account.email || "Custom Email",
          isActive: account.isActive,
          isConnected: account.isActive,
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
        }));
    }

    // Facebook Messenger and Instagram Direct
    if (
      channelName === "facebook_messenger" ||
      channelName === "instagram_direct"
    ) {
      const accountsList = (channel.facebookAccounts ||
        []) as FacebookAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title:
          account.pageName ||
          (channelName === "facebook_messenger"
            ? "Facebook Page"
            : "Instagram Page"),
        subtitle:
          channelName === "facebook_messenger"
            ? account.accountType === "messenger"
              ? "Facebook Messenger"
              : "Facebook"
            : "Instagram Direct",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: channelName,
          pageId: account.pageId,
          accountType: account.accountType,
          instagramAccountId: account.instagramAccountId,
          verificationStatus: account.verificationStatus,
          connectedChannelId: account.connectedChannelId,
          verifiedAt: account.verifiedAt,
          verificationAttempts: account.verificationAttempts,
          verificationError: account.verificationError,
        },
      }));
    }

    // WhatsApp Business
    if (channelName === "whatsapp") {
      const accountsList = (channel.whatsappAccounts ||
        []) as WhatsAppAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title:
          account.verifiedName ||
          account.businessName ||
          account.displayPhoneNumber ||
          "WhatsApp Account",
        subtitle: account.displayPhoneNumber || "WhatsApp Business",
        isActive: account.isActive,
        isConnected: account.isActive,
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
      }));
    }

    // Twilio SMS
    if (channelName === "twilio_sms") {
      const accountsList = (channel.smsAccounts || []) as TwilioSmsAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.phoneNumber || "Twilio SMS Account",
        subtitle: "Twilio SMS",
        isActive: account.isActive,
        isConnected: account.isActive,
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
      }));
    }

    // Outlook / Microsoft 365 Email
    if (channelName === "outlook") {
      const accountsList = (channel.emailAccounts || []) as CalendarAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.email || "Outlook Account",
        subtitle: account.provider || "Outlook",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "outlook",
          verificationStatus: account.verificationStatus,
          connectedChannelId: account.connectedChannelId,
          sharedCredentialId: account.sharedCredentialId,
          verifiedAt: account.verifiedAt,
          verificationAttempts: account.verificationAttempts,
          verificationError: account.verificationError,
        },
      }));
    }

    // Telegram
    if (channelName === "telegram") {
      const accountsList = (channel.telegramAccounts ||
        []) as TelegramAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.displayName || account.username || "Telegram Account",
        subtitle: account.phoneNumber ? `+${account.phoneNumber}` : "Telegram",
        isActive: account.isActive,
        isConnected: account.isActive,
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
      }));
    }

    // PayPal
    if (channelName === "paypal") {
      const accountsList = (channel.paypalAccounts || []) as PayPalAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.email || "PayPal Account",
        subtitle: "PayPal",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "paypal",
          paypalMerchantId: account.paypalMerchantId,
          email: account.email,
          accountStatus: account.accountStatus,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }

    // Calendly
    if (channelName === "calendly") {
      const accountsList = (channel.calendlyAccounts ||
        []) as CalendlyAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.displayName || account.email || "Calendly Account",
        subtitle: account.email || "Calendly",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "calendly",
          calendlyUserUri: account.calendlyUserUri,
          displayName: account.displayName,
          email: account.email,
          timezone: account.timezone,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }

    // Zoom
    if (channelName === "zoom") {
      const accountsList = (channel.zoomAccounts || []) as ZoomAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.displayName || account.email || "Zoom Account",
        subtitle: account.email || "Zoom",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "zoom",
          zoomUserId: account.zoomUserId,
          displayName: account.displayName,
          email: account.email,
          accountId: account.accountId,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }

    // Shopify
    if (channelName === "shopify") {
      const accountsList = (channel.shopifyAccounts || []) as ShopifyAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.shopName || account.shopDomain || "Shopify Store",
        subtitle: account.shopDomain || "Shopify",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "shopify",
          shopDomain: account.shopDomain,
          shopName: account.shopName,
          shopEmail: account.shopEmail,
          shopifyStoreId: account.shopifyStoreId,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }
    if (channelName === "stripe") {
      const accountsList = (channel.stripeAccounts || []) as StripeAccount[];
      return accountsList.map<ConnectionDisplayData>((account) => ({
        id: account.id,
        title: account.stripeAccountId || "Stripe Store",
        subtitle: account.stripeUserId || "Stripe",
        isActive: account.isActive,
        isConnected: account.isActive,
        metadata: {
          provider: "stripe",
          publishableKey: account.publishableKey,
          stripeAccountId: account.stripeAccountId,
          stripeUserId: account.stripeUserId,
          accessToken: account.accessToken,
          connectedChannelId: account.connectedChannelId,
        },
      }));
    }

    return [];
  }, [channel]);

  return {
    accounts,
  };
};
