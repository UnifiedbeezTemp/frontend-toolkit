import { useMemo } from "react";
import { useWebchatConnections } from "./useWebchatConnections";
import { formMapperMap } from "../mappers/formMapperMap";
import { GmailAccount } from "../mappers/gmailFormMapper";
import { FacebookAccount } from "../mappers/facebookFormMapper";
import { WhatsAppAccount } from "../mappers/whatsappFormMapper";
import { OutlookAccount } from "../mappers/outlookFormMapper";
import { TwilioSmsAccount } from "../mappers/twilioSmsFormMapper";
import { TelegramAccount } from "../mappers/telegramFormMapper";
import { PayPalAccount } from "../mappers/paypalFormMapper";
import { CalendlyAccount } from "../mappers/calendlyFormMapper";
import { Channel } from "../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { GoogleCalendarAccount } from "../config/google_calendar/types";
import { MicrosoftCalendarAccount } from "../config/microsoft_calendar/types";
import { ZoomAccount } from "../mappers/zoomFormMapper";
import { ShopifyAccount } from "../mappers/shopifyFormMapper";

export const useConnectionData = (
  channelName: string,
  connectionId: string | number | null,
  channel?: Channel | null,
): ChannelConnection | null => {
  const { connections } = useWebchatConnections();

  return useMemo(() => {
    if (!connectionId || !channelName) return null;

    const mapper = formMapperMap[channelName];
    if (!mapper) return null;

    if (channelName === "outlook" && channel) {
      const accounts = (channel.emailAccounts ||
        []) as unknown as OutlookAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "webchat") {
      const webchats = connections?.webchats || [];
      const connection = webchats.find(
        (conn) => String(conn.id) === String(connectionId),
      );
      if (connection) {
        return mapper(connection);
      }
    }

    if (channelName === "gmail" && channel) {
      const accounts = (channel.emailAccounts || []) as GmailAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "google_calendar" && channel) {
      const accounts = (channel.calendarAccounts ||
        []) as unknown as GoogleCalendarAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "microsoft_calendar" && channel) {
      const accounts = (channel.calendarAccounts ||
        []) as unknown as MicrosoftCalendarAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
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
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "facebook_messenger" && channel) {
      const accounts = (channel.facebookAccounts ||
        []) as unknown as FacebookAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "twilio_sms" && channel) {
      const accounts = (channel.smsAccounts ||
        []) as unknown as TwilioSmsAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "whatsapp" && channel) {
      const accounts = (channel.whatsappAccounts ||
        []) as unknown as WhatsAppAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "telegram" && channel) {
      const accounts = (channel.telegramAccounts ||
        []) as unknown as TelegramAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "paypal" && channel) {
      const accounts = (channel.paypalAccounts ||
        []) as unknown as PayPalAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "calendly" && channel) {
      const accounts = (channel.calendlyAccounts ||
        []) as unknown as CalendlyAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }
    if (channelName === "zoom" && channel) {
      const accounts = (channel.zoomAccounts || []) as unknown as ZoomAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    if (channelName === "shopify" && channel) {
      const accounts = (channel.shopifyAccounts ||
        []) as unknown as ShopifyAccount[];
      const account = accounts.find(
        (acc) => String(acc.id) === String(connectionId),
      );
      if (account) {
        return mapper(account);
      }
    }

    return null;
  }, [channelName, connectionId, connections, channel]);
};
