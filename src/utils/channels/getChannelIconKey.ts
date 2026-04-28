import { ChannelType } from "../../types/conversationApiTypes";

interface ChannelIconMap {
  [key: string]: string;
}



export const getChannelIconKeyFromChannelType = (
  channelType: ChannelType,
): string => {
  const iconMap: Record<ChannelType, string> = {
    WHATSAPP: "whatsappIcon",
    FACEBOOK_MESSENGER: "facebookMessengerLogo",
    INSTAGRAM: "instagramLogo",
    INSTAGRAM_DIRECT: "instagramLogo",
    TELEGRAM: "telegramLogo",
    EMAIL: "emailRedIcon",
    SMS: "twilioSmsIcon",
    WEBCHAT: "websiteWebChatIcon",
    LIVECHAT: "websiteWebChatIcon",
  };

  return iconMap[channelType] || "linkExternal";
};

export const getChannelIconKey = (channelName: string): string => {
  const iconMap: ChannelIconMap = {
    whatsapp: "whatsappIcon",
    webchat: "websiteWebChatIcon",
    livechat: "websiteWebChatIcon",
    facebook_messenger: "facebookMessengerLogo",
    instagram_direct: "instagramLogo",
    telegram: "telegramLogo",
    linkedin_messenger: "linkedinLogo",
    gmail: "google",
    outlook: "microsoftCalendar",
    custom_email: "emailRed",
    hubspot: "hubspotLogo",
    pipedrive: "pipedriveLogo",
    slack: "slackLogo",
    google_ads: "googleLogo",
    square: "squareLogo",
    shopify: "shopifyLogo",
    stripe: "stripeLogo",
    paypal: "paypalLogo",
    calendly: "calendyLogo",
    zoom: "zoomLogo",
    microsoft_calendar: "microsoftCalendar",
    google_calendar: "googleCalendar",
    twilio_sms: "twilioSmsIcon",
    twilio_voice: "twilioPhoneIcon",
  };

  return iconMap[channelName.toLowerCase()] || "linkExternal";
};
