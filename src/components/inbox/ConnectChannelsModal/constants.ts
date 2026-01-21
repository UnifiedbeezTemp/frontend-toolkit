import { Channel, ChannelAccount } from "./types"

export const connectedChannels: Channel[] = [
  {
    id: "facebook-messenger",
    name: "Facebook Messenger",
    icon: "facebookMessengerLogo",
    identifier: "Brian",
  },
  {
    id: "website-webchat",
    name: "Website Webchat",
    icon: "websiteWebChatIcon",
    identifier: "Brian Webchat",
  },
  {
    id: "calendly",
    name: "Calendly",
    icon: "calendyLogo",
    identifier: "Brian@gmail.com",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "telegramLogo",
    identifier: "Brian George",
  },
  {
    id: "instagram",
    name: "Instagram DMs",
    icon: "instagramLogo",
    identifier: "Brian George",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedinLogo",
    identifier: "Brian George",
  },
  {
    id: "whatsapp",
    name: "Whatsapp",
    icon: "whatsappIcon",
    identifier: "+234 9029220646",
  },
]

export const channelAccounts: Record<string, ChannelAccount[]> = {
  whatsapp: [
    {
      id: "wa-1",
      phoneNumber: "+234 902 922 0646",
      name: "Brian George",
      isConnected: false,
      status: "disconnected",
    },
    {
      id: "wa-2",
      phoneNumber: "+234 902 922 0647",
      name: "Sarah Mitchell",
      isConnected: true,
      status: "connected",
    },
    {
      id: "wa-3",
      phoneNumber: "+234 902 922 0648",
      name: "Mike Johnson",
      isConnected: true,
      status: "connected",
    },
    {
      id: "wa-4",
      phoneNumber: "+234 902 922 0649",
      name: "Emma Davis",
      isConnected: false,
      status: "disconnected",
    },
  ],
  "facebook-messenger": [
    {
      id: "fb-1",
      name: "Brian",
      isConnected: true,
      status: "connected",
    },
  ],
  "website-webchat": [
    {
      id: "web-1",
      name: "Brian Webchat",
      isConnected: true,
      status: "connected",
    },
  ],
  calendly: [
    {
      id: "cal-1",
      email: "Brian@gmail.com",
      name: "Brian",
      isConnected: true,
      status: "connected",
    },
  ],
  telegram: [
    {
      id: "tg-1",
      name: "Brian George",
      isConnected: true,
      status: "connected",
    },
  ],
  instagram: [
    {
      id: "ig-1",
      name: "Brian George",
      isConnected: true,
      status: "connected",
    },
  ],
  linkedin: [
    {
      id: "li-1",
      name: "Brian George",
      isConnected: true,
      status: "connected",
    },
  ],
}
