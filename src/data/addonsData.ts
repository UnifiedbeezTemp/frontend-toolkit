import { OriginalPlan } from "../api/services/plan/types";
import { useSupabaseIcons } from "../lib/supabase/useSupabase";
import { Addon } from "../store/onboarding/types/addonTypes";

export const transformPlanToAddons = (
  plan: OriginalPlan,
  icons: ReturnType<typeof useSupabaseIcons>
): Addon[] => {
  const addons: Addon[] = [];

  if (plan.maxSeats !== null && plan.maxSeats > 1) {
    addons.push({
      id: "seats",
      name: "Additional Seats",
      price: 7,
      priceText: "Price: £7/month per seat",
      limit: plan.maxSeats,
      limitText: `Limit: Up to ${plan.maxSeats} seats`,
      icon: icons.seatsIcon,
    });
  }

  if (plan.maxAiAssistants !== null && plan.maxAiAssistants > 0) {
    addons.push({
      id: "ai-assistant",
      name: "AI Assistant",
      price: 25,
      priceText: "Price: £25/per month",
      limit: plan.maxAiAssistants,
      limitText: `Max Assistants: ${plan.maxAiAssistants} assistants`,
      icon: icons.usersCheck,
    });
  }

  if (plan.maxWhatsappChannels > 0) {
    addons.push({
      id: "whatsapp-channel",
      name: "Twilio WhatsApp Channel",
      price: 25,
      priceText: "Price: £25/per month",
      limit: plan.maxWhatsappChannels,
      limitText: `Limit: ${plan.maxWhatsappChannels} WhatsApp number${
        plan.maxWhatsappChannels !== 1 ? "s" : ""
      }`,
      icon: icons.riWhatsappLine,
    });
  }

  if (plan.maxCrmCalendarSync !== null && plan.maxCrmCalendarSync > 0) {
    addons.push({
      id: "crm-sync",
      name: "CRM / Calendar Sync",
      price: 20,
      priceText: "Price: £20/month",
      limit: plan.maxCrmCalendarSync,
      limitText: `Limit: ${
        plan.maxCrmCalendarSync === 1
          ? "Optional"
          : `Up to ${plan.maxCrmCalendarSync}`
      }`,
      icon: icons.lucideCalender,
    });
  }

  if (plan.maxEcommercePack !== null && plan.maxEcommercePack > 0) {
    addons.push({
      id: "ecommerce-pack",
      name: "Ecommerce Pack",
      price: 25,
      priceText: "Price: £25/month",
      limit: plan.maxEcommercePack,
      limitText: `Limit: ${plan.maxEcommercePack} Store${
        plan.maxEcommercePack !== 1 ? "s" : ""
      }`,
      icon: icons.ecommerceApparel,
    });
  }

  if (plan.maxMultiLanguageAi !== null && plan.maxMultiLanguageAi > 0) {
    addons.push({
      id: "multi-language",
      name: "Multi-language AI",
      price: 10,
      priceText: "Price: £10/month",
      limit: plan.maxMultiLanguageAi,
      limitText: `Limit: ${plan.maxMultiLanguageAi} language${
        plan.maxMultiLanguageAi !== 1 ? "s" : ""
      }`,
      icon: icons.languageIcon,
    });
  }

  if (plan.maxPrioritySupport !== null && plan.maxPrioritySupport > 0) {
    addons.push({
      id: "priority-support",
      name: "Priority Support",
      price: 25,
      priceText: "Price: £25/month",
      limit: plan.maxPrioritySupport,
      limitText: `Limit: ${plan.maxPrioritySupport} Allowed`,
      icon: icons.customerSupport,
    });
  }

  if (plan.maxWhiteLabelPortal !== null && plan.maxWhiteLabelPortal > 0) {
    addons.push({
      id: "white-label",
      name: "White-Label Portal",
      price: 99,
      priceText: "Price: £99/month",
      limit: plan.maxWhiteLabelPortal,
      limitText: `Limit: ${plan.maxWhiteLabelPortal}`,
      icon: icons.websiteActive,
    });
  }

  if (plan.maxTwilioVoicePack !== null && plan.maxTwilioVoicePack > 0) {
    addons.push({
      id: "voice-call",
      name: "Twilio Voice Pack",
      price: 20,
      priceText: "Price: £20/per month",
      limit: plan.maxTwilioVoicePack,
      limitText: `Limit: ${plan.maxTwilioVoicePack} phone number${
        plan.maxTwilioVoicePack !== 1 ? "s" : ""
      }`,
      icon: icons.tabblerBrandTwillo,
    });
  }

  if (plan.maxTwilioMessagePack !== null && plan.maxTwilioMessagePack > 0) {
    addons.push({
      id: "sms-pack",
      name: "Twilio Message Pack (SMS)",
      price: 20,
      priceText: "Price: £20/per month",
      limit: plan.maxTwilioMessagePack,
      limitText: `Limit: ${plan.maxTwilioMessagePack} phone number${
        plan.maxTwilioMessagePack !== 1 ? "s" : ""
      }`,
      icon: icons.tabblerBrandTwillo,
    });
  }

  return addons;
};

export const getAddonsData = (
  icons: ReturnType<typeof useSupabaseIcons>
): Addon[] => [
  {
    id: "seats",
    name: "Seats",
    price: 7,
    priceText: "Price: £7/month per seat",
    limit: 10,
    limitText: "Limit: Up to 10",
    icon: icons.seatsIcon,
  },
  {
    id: "ai-assistant",
    name: "AI assistant",
    price: 25,
    priceText: "Price: £25/per month",
    limit: 5,
    limitText: "Max Assistants: 5 assistants",
    icon: icons.usersCheck,
  },
  {
    id: "whatsapp-channel",
    name: "Twilio WhatsApp Channel",
    price: 25,
    priceText: "Price: £25/per month",
    limit: 1,
    limitText: "Limit: 1 WhatsApp number/per 1,000 messages",
    icon: icons.riWhatsappLine,
  },
  {
    id: "sms-pack",
    name: "Twilio Message Pack (SMS)",
    price: 20,
    priceText: "Price: £20/per month",
    limit: 1,
    limitText: "Limit: 1 phone number/per 1,000 messages",
    icon: icons.tabblerBrandTwillo,
  },
  {
    id: "voice-call",
    name: "Twilio Message Pack (Voice Call)",
    price: 20,
    priceText: "Price: £20/per month",
    limit: 1,
    limitText: "Limit: 1 phone number",
    icon: icons.tabblerBrandTwillo,
  },
  {
    id: "multi-language",
    name: "Multi-language AI",
    price: 10,
    priceText: "Price: £10/month",
    limit: 3,
    limitText: "Limit: 3/per language",
    icon: icons.languageIcon,
  },
  {
    id: "priority-support",
    name: "Priority Support",
    price: 25,
    priceText: "Price: £25/month",
    limit: 1,
    limitText: "Limit: 1 Allowed",
    icon: icons.customerSupport,
  },
  {
    id: "white-label",
    name: "White-Label Portal",
    price: 99,
    priceText: "Price: £99/month",
    limit: 3,
    limitText: "Limit: 3",
    icon: icons.websiteActive,
  },
  {
    id: "crm-sync",
    name: "CRM / Calendar Sync",
    price: 20,
    priceText: "Price: £20/month",
    limit: 1000000000,
    limitText: "Limit: Optional",
    icon: icons.lucideCalender,
  },
  {
    id: "ecommerce-pack",
    name: "Ecommerce Pack",
    price: 25,
    priceText: "Price: £25/month (Stripe gated)",
    limit: 1,
    limitText: "Limit: 1 Store",
    icon: icons.ecommerceApparel,
  },
];
