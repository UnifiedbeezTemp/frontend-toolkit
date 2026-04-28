import { useMemo } from "react";
import { formMapperMap } from "../mappers/formMapperMap";
import { GmailAccount } from "../mappers/gmailFormMapper";
import { FacebookAccount } from "../mappers/facebookFormMapper";
import { WhatsAppAccount } from "../mappers/whatsappFormMapper";
import { OutlookAccount } from "../mappers/outlookFormMapper";
import { TwilioSmsAccount } from "../mappers/twilioSmsFormMapper";
import { TelegramAccount } from "../mappers/telegramFormMapper";
import { PayPalAccount } from "../mappers/paypalFormMapper";
import { CalendlyAccount } from "../mappers/calendlyFormMapper";
import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { GoogleCalendarAccount } from "../config/google_calendar/types";
import { MicrosoftCalendarAccount } from "../config/microsoft_calendar/types";
import { ZoomAccount } from "../mappers/zoomFormMapper";
import { ShopifyAccount } from "../mappers/shopifyFormMapper";
import { SelectedChannel } from "../../../types/channelApiTypes";
import { LiveChatConnection } from "../mappers/livechatFormMapper";

export const useAccountData = (
  channelName: string,
  accountId: string | number | null,
  channel?: SelectedChannel | null,
): ChannelConnection | null => {
  return useMemo(() => {
    if (!accountId || !channelName) return null;

    const mapper = formMapperMap[channelName];
    if (!mapper) return null;

    if (channelName === "outlook" && channel) {
      const accounts = (channel.emailAccounts ||
        []) as unknown as OutlookAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "webchat") {
      const livechats = (channel?.liveChatConfigs ||
        []) as unknown as LiveChatConnection[];
      const account = livechats.find(
        (conn) => String(conn.id) === String(accountId),
      );

      if (account) {
        const liveChatConn: LiveChatConnection = {
          ...account,
          connectedChannel: {
            id: Number(channel?.id ?? 0),
            userId: channel?.userId ?? 0,
            availableChannelId: channel?.availableChannelId ?? 0,
            channelName: channel?.channelName ?? "",
            isActive: channel?.isActive ?? false,
            isConnected: channel?.isConnected ?? false,
            credentials: channel?.credentials,
          },
        };
        return mapper(liveChatConn);
      }
    }
    if (channelName === "livechat" && channel) {
      const livechats = (channel.liveChatConfigs ||
        []) as unknown as LiveChatConnection[];
      const account = livechats.find(
        (conn) => String(conn.id) === String(accountId),
      );

      if (account) {
        const liveChatConn: LiveChatConnection = {
          ...account,
          connectedChannel: {
            id: Number(channel.id),
            userId: channel.userId,
            availableChannelId: channel.availableChannelId,
            channelName: channel.channelName,
            isActive: channel.isActive,
            isConnected: channel.isConnected,
            credentials: channel.credentials,
          },
        };
        return mapper(liveChatConn);
      }
    }

    if (channelName === "gmail" && channel) {
      const accounts = (channel.emailAccounts || []) as GmailAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "google_calendar" && channel) {
      const accounts = (channel.calendarAccounts ||
        []) as unknown as GoogleCalendarAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );

      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "microsoft_calendar" && channel) {
      const accounts = (channel.calendarAccounts ||
        []) as unknown as MicrosoftCalendarAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "custom_email" && channel) {
      const accounts = (channel.emailAccounts || []) as GmailAccount[];
      const customAccounts = accounts.filter(
        (acc) => acc.provider === "custom",
      );
      const account = customAccounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "facebook_messenger" && channel) {
      const accounts = (channel.facebookAccounts ||
        []) as unknown as FacebookAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "instagram_direct" && channel) {
      const accounts = (channel.facebookAccounts ||
        []) as unknown as FacebookAccount[];
        const account = accounts.find(
          (acc) => String(acc.id) === String(accountId),
        );
        console.log(account)
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "twilio_sms" && channel) {
      const accounts = (channel.smsAccounts ||
        []) as unknown as TwilioSmsAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "whatsapp" && channel) {
      const accounts = (channel.whatsappAccounts ||
        []) as unknown as WhatsAppAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "telegram" && channel) {
      const accounts = (channel.telegramAccounts ||
        []) as unknown as TelegramAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "paypal" && channel) {
      const accounts = (channel.paypalAccounts ||
        []) as unknown as PayPalAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "calendly" && channel) {
      const accounts = (channel.calendlyAccounts ||
        []) as unknown as CalendlyAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "zoom" && channel) {
      const accounts = (channel.zoomAccounts || []) as unknown as ZoomAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "shopify" && channel) {
      const accounts = (channel.shopifyAccounts ||
        []) as unknown as ShopifyAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "stripe" && channel) {
      const accounts = (channel.stripeAccounts || []) as unknown as ShopifyAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(accountId),
      );
      if (account) {
        return mapper(account);
      }
    }

    return null;
  }, [channelName, accountId, channel]);
};
