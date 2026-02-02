import { ChannelConfigComponent } from "./BaseChannelConfig";
import { WhatsAppConfig } from "./whatsapp";
import { FacebookConfig } from "./facebook";
import { InstagramConfig } from "./instagram";
import { GoogleConfig } from "./google";
import { WebchatConfig } from "./webchat";
import { OutlookConfig } from "./outlook";
import { GoogleCalendarConfig } from "./google_calendar";
import { MicrosoftCalendarConfig } from "./microsoft_calendar";
import { CustomEmailConfig } from "./custom_email";
import { PlaceholderConfig } from "./placeholder";
import { TwilioSmsConfig } from "./twilio_sms";
import { CalendlyConfig } from "./calendly";
import { PayPalConfig } from "./paypal";
import { ShopifyConfig } from "./shopify";
import { StripeConfig } from "./stripe";
import { ZoomConfig } from "./zoom";
import { TelegramConfig } from "./telegram";

export const channelConfigMap: Record<string, ChannelConfigComponent> = {
  whatsapp: WhatsAppConfig,
  webchat: WebchatConfig,
  facebook_messenger: FacebookConfig as ChannelConfigComponent,
  instagram_direct: InstagramConfig as ChannelConfigComponent,
  gmail: GoogleConfig as ChannelConfigComponent,
  outlook: OutlookConfig as ChannelConfigComponent,
  google_calendar: GoogleCalendarConfig as ChannelConfigComponent,
  microsoft_calendar: MicrosoftCalendarConfig as ChannelConfigComponent,
  custom_email: CustomEmailConfig as ChannelConfigComponent,
  twilio_sms: TwilioSmsConfig as ChannelConfigComponent,
  telegram: TelegramConfig as ChannelConfigComponent,
  calendly: CalendlyConfig as ChannelConfigComponent,
  zoom: ZoomConfig as ChannelConfigComponent,
  shopify: ShopifyConfig as ChannelConfigComponent,
  paypal: PayPalConfig as ChannelConfigComponent,
  stripe: StripeConfig as ChannelConfigComponent,
};
