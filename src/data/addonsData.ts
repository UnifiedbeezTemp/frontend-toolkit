import { useSupabaseIcons } from "../lib/supabase/useSupabase";
import { Addon } from "../store/onboarding/types/addonTypes";
import { ApiAddon } from "../types/apiAddonTypes";

export const getAddonUiMetadata = (
  type: string,
  remainingPurchasable: number | null,
  icons: ReturnType<typeof useSupabaseIcons>,
): { uiId: string; icon: string; limitText: string } => {
  let uiId = "";
  let icon = "";
  let limitText = "";

  switch (type) {
    case "EXTRA_AI_ASSISTANT":
      uiId = "ai-assistant";
      icon = icons.usersCheck;
      limitText =
        remainingPurchasable !== null
          ? `Max Assistants: ${remainingPurchasable} assistants`
          : "Unlimited assistants";
      break;
    case "EXTRA_SEAT":
      uiId = "seats";
      icon = icons.seatsIcon;
      limitText =
        remainingPurchasable !== null
          ? `Limit: Up to ${remainingPurchasable} seats`
          : "Unlimited seats";
      break;
    case "EXTRA_WHATSAPP_CHANNEL":
      uiId = "whatsapp-channel";
      icon = icons.riWhatsappLine;
      limitText = `Limit: ${
        remainingPurchasable !== null ? remainingPurchasable : "Unlimited"
      } WhatsApp number${remainingPurchasable !== 1 ? "s" : ""}`;
      break;
    case "MULTI_LANGUAGE_AI":
      uiId = "multi-language";
      icon = icons.languageIcon;
      limitText = `Limit: ${
        remainingPurchasable !== null ? remainingPurchasable : "Unlimited"
      } language${remainingPurchasable !== 1 ? "s" : ""}`;
      break;
    case "WHITE_LABEL_PORTAL":
      uiId = "white-label";
      icon = icons.websiteActive;
      limitText = `Limit: ${
        remainingPurchasable !== null ? remainingPurchasable : "Unlimited"
      }`;
      break;
    case "TWILIO_MESSAGE_PACK":
      uiId = "sms-pack";
      icon = icons.tabblerBrandTwillo;
      limitText = "Limit: 1 phone number/per 1,000 messages";
      break;
    case "TWILIO_VOICE_PACK":
      uiId = "voice-call";
      icon = icons.tabblerBrandTwillo;
      limitText = `Limit: ${
        remainingPurchasable !== null ? remainingPurchasable : "Unlimited"
      } phone number${remainingPurchasable !== 1 ? "s" : ""}`;
      break;
    case "CRM_CALENDAR_SYNC":
      uiId = "crm-sync";
      icon = icons.lucideCalender;
      limitText = `Limit: ${remainingPurchasable !== null ? remainingPurchasable : "Unlimited"}`;
      break;
    case "ECOMMERCE_PACK":
      uiId = "ecommerce-pack";
      icon = icons.ecommerceApparel;
      limitText = `Limit: ${remainingPurchasable !== null ? remainingPurchasable : "Unlimited"}`;
      break;
    case "PRIORITY_SUPPORT":
      uiId = "priority-support";
      icon = icons.customerSupport;
      limitText = `Limit: ${remainingPurchasable !== null ? remainingPurchasable : "Unlimited"}`;
      break;
    case "RESELLER_AGENCY_PORTAL":
      uiId = "reseller-portal";
      icon = icons.websiteActive;
      limitText = `Limit: ${remainingPurchasable !== null ? remainingPurchasable : "Unlimited"}`;
      break;
    default:
      uiId = `addon-${type}`;
      icon = icons.greenCreditCard; // Fallback
      limitText = `Limit: ${
        remainingPurchasable !== null ? remainingPurchasable : "Unlimited"
      }`;
  }

  return { uiId, icon, limitText };
};

export const transformApiAddonsToUiAddons = (
  apiAddons: ApiAddon[],
  icons: ReturnType<typeof useSupabaseIcons>,
  isYearly?: boolean,
): Addon[] => {
  return apiAddons
    .filter((addon) => {
      // Basic category filter
      if (addon.category === "USAGE_PACK") return false;

      // Filter out if limit is 0 AND NOT included by default
      return addon.maxAllowed !== 0 || addon.isIncludedInPlan;
    })
    .map((addon) => {
      const { uiId, icon, limitText } = getAddonUiMetadata(
        addon.type,
        addon.remainingPurchasable,
        icons,
      );

      const monthlyPrice = addon.priceEur / 100;
      const displayPrice = isYearly ? monthlyPrice * 12 : monthlyPrice;
      const priceSuffix = isYearly ? "/year" : "/month";
      const priceText = `Price: £${displayPrice}${priceSuffix}`;

      return {
        id: String(addon.id),
        name: addon.name,
        price: monthlyPrice,
        priceText: priceText,
        limit: addon.remainingPurchasable ?? -1, // Use -1 as indicator for unlimited instead of 9999
        limitText: limitText,
        icon: icon,
        addonType: addon.type,
        billingType: addon.billingInterval || addon.billingType,
        used: 0,
        category: addon.category,
        isIncludedInPlan: addon.isIncludedInPlan,
      };
    });
};
