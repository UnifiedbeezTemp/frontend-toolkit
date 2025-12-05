import { Channel } from "../store/onboarding/types/channelTypes";

interface SupabaseAssets {
  whatsappIcon: string;
  websiteWebChat: string;
  facebookMessengerLogo: string;
  instagramLogo: string;
  telegramLogo: string;
  linkedinLogo: string;
  linkExternal: string;
  // Integrations & Business Tools
  zoomLogo: string;
  microsoftLogo: string;
  calendyLogo: string;
  googleLogo: string;
  hubspotLogo: string;
  pipedriveLogo: string;
  slackLogo: string;
  // Payments & E-commerce
  stripeLogo: string;
  paypalLogo: string;
  shopifyLogo: string;
}

export const getChannelsData = (assets: SupabaseAssets): Channel[] => [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    description: "Real-time AI-powered live chat.",
    info: "5 Whatsapp channel available",
    icon: assets.whatsappIcon,
    isSelected: false,
    type: "Communication Channels",
    tags: ["popular"],
  },
  {
    id: "website-chat",
    name: "Website Webchat",
    description: "Business messaging.",
    info: "Business + Bundled",
    icon: assets.websiteWebChat,
    isSelected: false,
    hasBorder: true,
    type: "Communication Channels",
    tags: ["popular"],
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    description: "Social messaging",
    info: "All Plans",
    icon: assets.facebookMessengerLogo,
    isSelected: false,
    type: "Communication Channels",
  },
  {
    id: "instagram",
    name: "Instagram DMs",
    description: "Direct messaging from IG inbox",
    info: "Business + Bundled",
    icon: assets.instagramLogo,
    isSelected: false,
    type: "Communication Channels",
    tags: ["popular"],
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Public & private bot messaging",
    info: "Business + Add-on",
    icon: assets.telegramLogo,
    isSelected: false,
    type: "Communication Channels",
  },
  {
    id: "linkedin",
    name: "LinkedIn Messaging",
    description: "B2B lead conversations",
    info: "All Plans",
    icon: assets.linkedinLogo,
    isSelected: false,
    type: "Communication Channels",
  },
  {
    id: "google",
    name: "Google Workspace",
    description: "Gmail, Calendar, Sheet",
    info: "Business + via CRM Add-on",
    icon: assets.googleLogo,
    isSelected: false,
    type: "CRM & Calendar Sync",
    tags: ["popular"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Marketing, Sales, and Service CRM",
    info: "Full API integration for Contacts, Deals, and Tickets.",
    icon: assets.hubspotLogo,
    isSelected: false,
    type: "CRM & Calendar Sync",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Sales Pipeline Management",
    info: "Sync deals, activities, and contact history.",
    icon: assets.pipedriveLogo,
    isSelected: false,
    type: "CRM & Calendar Sync",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Automated Meeting Scheduler",
    info: "Simple 1-way calendar sync for availability.",
    icon: assets.calendyLogo,
    isSelected: false,
    type: "CRM & Calendar Sync",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team Messaging & Notifications",
    info: "Real-time alerts for system events and critical data.",
    icon: assets.slackLogo,
    isSelected: false,
    type: "CRM & Calendar Sync",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Video Conferencing & Webinars",
    info: "Generate meeting links directly from appointments.",
    icon: assets.zoomLogo,
    isSelected: false,
    type: "Ecommerce & Payment",
    tags: ["popular"],
  },
  {
    id: "microsoft",
    name: "Microsoft Teams",
    description: "Chat, Meetings, and Collaboration",
    info: "Integrates with Microsoft 365 environment.",
    icon: assets.microsoftLogo,
    isSelected: false,
    type: "Ecommerce & Payment",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment Processing Gateway",
    info: "Handle subscription billing and one-time payments securely.",
    icon: assets.stripeLogo,
    isSelected: false,
    type: "Ecommerce & Payment",
    tags: ["popular"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Online Payment System",
    info: "Easy checkout options and invoice generation.",
    icon: assets.paypalLogo,
    isSelected: false,
    type: "Ecommerce & Payment",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce Store Management",
    info: "Sync customer and order data for fulfillment.",
    icon: assets.shopifyLogo,
    isSelected: false,
    type: "Ecommerce & Payment",
    tags: ["popular"],
  },
];
