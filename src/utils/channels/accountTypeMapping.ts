type AccountType =
  | "WHATSAPP"
  | "MESSENGER"
  | "INSTAGRAM"
  | "EMAIL"
  | "SMS"
  | "CALENDAR"
  | "PAYPAL"
  | "STRIPE"
  | "TELEGRAM"
  | "ZOOM"
  | "CALENDLY"
  | "LIVECHAT"
  | "SHOPIFY";

export const PROVIDER_TO_ACCOUNT_TYPE: Record<string, AccountType> = {
  gmail: "EMAIL",
  outlook: "EMAIL",
  custom_email: "EMAIL",
  whatsapp: "WHATSAPP",
  facebook_messenger: "MESSENGER",
  messenger: "MESSENGER",
  instagram_direct: "INSTAGRAM",
  sms: "SMS",
  twilio: "SMS",
  google_calendar: "CALENDAR",
  twilio_sms: "SMS",
  microsoft_calendar: "CALENDAR",
  paypal: "PAYPAL",
  stripe: "STRIPE",
  telegram: "TELEGRAM",
  zoom: "ZOOM",
  calendly: "CALENDLY",
  provider: "EMAIL",
  webchat: "LIVECHAT",
  shopify: "SHOPIFY",
};
