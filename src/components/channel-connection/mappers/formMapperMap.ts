import { mapWebchatConnectionToFormData } from "./webchatFormMapper";
import { GmailAccount, mapGmailAccountToFormData } from "./gmailFormMapper";
import { mapGoogleCalendarConnectionToFormData } from "./googleCalendarFormMapper";
import { mapMicrosoftCalendarConnectionToFormData } from "./microsoftCalendarFormMapper";
import {
  CustomEmailAccount,
  mapCustomEmailConnectionToFormData,
} from "./customEmailFormMapper";
import {
  FacebookAccount,
  mapFacebookAccountToFormData,
} from "./facebookFormMapper";
import {
  WhatsAppAccount,
  mapWhatsAppAccountToFormData,
} from "./whatsappFormMapper";
import {
  OutlookAccount,
  mapOutlookAccountToFormData,
} from "./outlookFormMapper";
import {
  TwilioSmsAccount,
  mapTwilioSmsAccountToFormData,
} from "./twilioSmsFormMapper";
import {
  TelegramAccount,
  mapTelegramAccountToFormData,
} from "./telegramFormMapper";
import { PayPalAccount, mapPayPalAccountToFormData } from "./paypalFormMapper";
import {
  CalendlyAccount,
  mapCalendlyAccountToFormData,
} from "./calendlyFormMapper";
import { ZoomAccount, mapZoomAccountToFormData } from "./zoomFormMapper";
import {
  ShopifyAccount,
  mapShopifyAccountToFormData,
} from "./shopifyFormMapper";
import { ChannelConnection } from "../../../types/channelConnectionTypes";
import { GoogleCalendarAccount } from "../config/google_calendar/types";
import { MicrosoftCalendarAccount } from "../config/microsoft_calendar/types";
import { LiveChatConnection, mapLiveChatConnectionToFormData } from "./livechatFormMapper";
import { StripeAccount } from "../../../types/channelAccountDetailTypes";
import { mapStripeAccountToFormData } from "./StripeFormMapper";

export const formMapperMap: Record<
  string,
  (
    connection:
      | LiveChatConnection
      | GmailAccount
      | GoogleCalendarAccount
      | MicrosoftCalendarAccount
      | CustomEmailAccount
      | FacebookAccount
      | WhatsAppAccount
      | OutlookAccount
      | TwilioSmsAccount
      | TelegramAccount
      | PayPalAccount
      | CalendlyAccount
      | ZoomAccount
      | ShopifyAccount
      | StripeAccount,
  ) => ChannelConnection
> = {
  webchat: (connection) =>
    // mapWebchatConnectionToFormData(connection as WebchatConnection),
   mapLiveChatConnectionToFormData(connection as LiveChatConnection),
  livechat: (connection) =>
    mapLiveChatConnectionToFormData(connection as LiveChatConnection),
  gmail: (connection) => mapGmailAccountToFormData(connection as GmailAccount),
  google_calendar: (connection) =>
    mapGoogleCalendarConnectionToFormData(connection as GoogleCalendarAccount),
  microsoft_calendar: (connection) =>
    mapMicrosoftCalendarConnectionToFormData(
      connection as MicrosoftCalendarAccount,
    ),
  custom_email: (connection) =>
    mapCustomEmailConnectionToFormData(connection as CustomEmailAccount),
  facebook_messenger: (connection) =>
    mapFacebookAccountToFormData(connection as FacebookAccount),
  instagram_direct: (connection) =>
    mapFacebookAccountToFormData(connection as FacebookAccount),
  whatsapp: (connection) =>
    mapWhatsAppAccountToFormData(connection as WhatsAppAccount),
  outlook: (connection) =>
    mapOutlookAccountToFormData(connection as OutlookAccount),
  twilio_sms: (connection) =>
    mapTwilioSmsAccountToFormData(connection as TwilioSmsAccount),
  telegram: (connection) =>
    mapTelegramAccountToFormData(connection as TelegramAccount),
  paypal: (connection) =>
    mapPayPalAccountToFormData(connection as PayPalAccount),
  calendly: (connection) =>
    mapCalendlyAccountToFormData(connection as CalendlyAccount),
  zoom: (connection) => mapZoomAccountToFormData(connection as ZoomAccount),
  shopify: (connection) =>
    mapShopifyAccountToFormData(connection as unknown as ShopifyAccount),
  stripe: (connection) =>
    mapStripeAccountToFormData(connection as unknown as StripeAccount),
};
