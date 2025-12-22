import { useSupabaseIcons } from "../lib/supabase/useSupabase";
import { Addon } from "../store/onboarding/types/addonTypes";
import { ApiAddon } from "../types/apiAddonTypes";

export const transformApiAddonsToUiAddons = (
  apiAddons: ApiAddon[],
  icons: ReturnType<typeof useSupabaseIcons>
): Addon[] => {
  return apiAddons.map((addon) => {
    let uiId = "";
    let icon = "";
    let limitText = "";

    switch (addon.type) {
      case "EXTRA_AI_ASSISTANT":
        uiId = "ai-assistant";
        icon = icons.usersCheck;
        limitText = addon.maxQuantity 
          ? `Max Assistants: ${addon.maxQuantity} assistants` 
          : "Unlimited assistants";
        break;
      case "EXTRA_SEAT":
        uiId = "seats";
        icon = icons.seatsIcon;
        limitText = addon.maxQuantity 
          ? `Limit: Up to ${addon.maxQuantity} seats` 
          : "Unlimited seats";
        break;
      case "EXTRA_WHATSAPP_CHANNEL":
        uiId = "whatsapp-channel";
        icon = icons.riWhatsappLine;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"} WhatsApp number${addon.maxQuantity !== 1 ? "s" : ""}`;
        break;
      case "MULTI_LANGUAGE_AI":
        uiId = "multi-language";
        icon = icons.languageIcon;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"} language${addon.maxQuantity !== 1 ? "s" : ""}`;
        break;
      case "WHITE_LABEL_PORTAL":
        uiId = "white-label";
        icon = icons.websiteActive;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"}`;
        break;
      case "TWILIO_MESSAGE_PACK":
        uiId = "sms-pack";
        icon = icons.tabblerBrandTwillo;
        // User's description: "1000 SMS/messaging credits"
        limitText = "Limit: 1 phone number/per 1,000 messages"; 
        break;
      case "TWILIO_VOICE_PACK":
        uiId = "voice-call";
        icon = icons.tabblerBrandTwillo;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"} phone number${addon.maxQuantity !== 1 ? "s" : ""}`;
        break;
      case "CRM_CALENDAR_SYNC":
        uiId = "crm-sync";
        icon = icons.lucideCalender;
        limitText = addon.maxQuantity === 1 ? "Optional" : `Up to ${addon.maxQuantity}`;
        break;
      case "ECOMMERCE_PACK":
        uiId = "ecommerce-pack";
        icon = icons.ecommerceApparel;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"} Store${addon.maxQuantity !== 1 ? "s" : ""}`;
        break;
      case "PRIORITY_SUPPORT":
        uiId = "priority-support";
        icon = icons.customerSupport;
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"} Allowed`;
        break;
      case "RESELLER_AGENCY_PORTAL":
        uiId = "reseller-portal";
        icon = icons.websiteActive; 
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"}`;
        break;
      default:
        uiId = `addon-${addon.id}`;
        icon = icons.greenCreditCard; // Fallback
        limitText = `Limit: ${addon.maxQuantity || "Unlimited"}`;
    }

    const price = addon.priceEur / 100;
    const priceText = `Price: £${price}/month`;

    return {
      id: uiId,
      name: addon.name,
      price: price,
      priceText: priceText,
      limit: addon.maxQuantity || 9999, // Fallback for sort/logic
      limitText: limitText,
      icon: icon,
      addonType: addon.type,
    };
  });
};


