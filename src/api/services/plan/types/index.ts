export interface OriginalPlan {
  id: number;
  planType: string;
  maxSeats: number | null;
  maxAiAssistants: number | null;
  maxWhatsappChannels: number;
  supportLevel: string;
  priceEur: number;
  hasFacebookMessenger: boolean;
  hasLinkedinMessenger: boolean;
  hasTelegram: boolean;
  hasWebchat: boolean;
  hasCrmCalendarSync: boolean;
  hasEcommercePack: boolean;
  hasZoomCalendly: boolean;
  canPurchaseAddons: boolean;
  maxCrmCalendarSync: number | null;
  maxEcommercePack: number | null;
  maxTwilioVoicePack: number | null;
  maxMultiLanguageAi: number | null;
  maxPrioritySupport: number;
  maxWhiteLabelPortal: number | null;
  maxTwilioMessagePack: number | null;
  maxResellerAgencyPortal: number;
  whatsappMessagesIncluded: number;
  whatsappMessagesHardLimit: number;
  maxVoiceNumbers: number;
  aiRepliesIncluded: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  tag: React.ReactNode;
  badge: React.ReactNode;
  monthlyPrice: number;
  addonAvailable: boolean;
  availableFeatures: string[];
  unAvailableFeatures: string[];
  ctaText: string;
  footerText: string;
  footerIcon: string;
  originalPlan: OriginalPlan;
}
