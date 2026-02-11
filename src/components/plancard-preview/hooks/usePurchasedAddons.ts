import { api, useAppQuery } from "../../../api";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useMemo } from "react";

interface PurchasedAddon {
  id: number;
  userId: number;
  addonDefinitionId: number;
  quantity: number;
  isActive: boolean;
  stripeProductId: string | null;
  stripePriceId: string;
  purchasedAt: string;
  expiresAt: string;
  addonDefinition: {
    id: number;
    type: string;
    name: string;
    description: string;
    priceEur: number;
    billingType: string;
    isActive: boolean;
    maxQuantity: number | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface PurchasedAddonsResponse {
  addons: PurchasedAddon[];
}

const getUiIdAndIcon = (
  addonType: string,
  icons: ReturnType<typeof useSupabaseIcons>,
): {
  uiId: string;
  icon: string;
  limitText: string;
  maxQuantity: number | null;
} => {
  const maxQuantity = null;

  switch (addonType) {
    case "EXTRA_AI_ASSISTANT":
      return {
        uiId: "ai-assistant",
        icon: icons.usersCheck,
        limitText: maxQuantity
          ? `Max Assistants: ${maxQuantity} assistants`
          : "Unlimited assistants",
        maxQuantity,
      };
    case "EXTRA_SEAT":
      return {
        uiId: "seats",
        icon: icons.seatsIcon,
        limitText: maxQuantity
          ? `Limit: Up to ${maxQuantity} seats`
          : "Unlimited seats",
        maxQuantity,
      };
    case "EXTRA_WHATSAPP_CHANNEL":
      return {
        uiId: "whatsapp-channel",
        icon: icons.riWhatsappLine,
        limitText: `Limit: ${maxQuantity || "Unlimited"} WhatsApp number${
          maxQuantity !== 1 ? "s" : ""
        }`,
        maxQuantity,
      };
    case "MULTI_LANGUAGE_AI":
      return {
        uiId: "multi-language",
        icon: icons.languageIcon,
        limitText: `Limit: ${maxQuantity || "Unlimited"} language${
          maxQuantity !== 1 ? "s" : ""
        }`,
        maxQuantity,
      };
    case "WHITE_LABEL_PORTAL":
      return {
        uiId: "white-label",
        icon: icons.websiteActive,
        limitText: `Limit: ${maxQuantity || "Unlimited"}`,
        maxQuantity,
      };
    case "TWILIO_MESSAGE_PACK":
      return {
        uiId: "sms-pack",
        icon: icons.tabblerBrandTwillo,
        limitText: "Limit: 1 phone number/per 1,000 messages",
        maxQuantity,
      };
    case "TWILIO_VOICE_PACK":
      return {
        uiId: "voice-call",
        icon: icons.tabblerBrandTwillo,
        limitText: `Limit: ${maxQuantity || "Unlimited"} phone number${
          maxQuantity !== 1 ? "s" : ""
        }`,
        maxQuantity,
      };
    case "CRM_CALENDAR_SYNC":
      return {
        uiId: "crm-sync",
        icon: icons.lucideCalender,
        limitText: maxQuantity === 1 ? "Optional" : `Up to ${maxQuantity}`,
        maxQuantity,
      };
    case "ECOMMERCE_PACK":
      return {
        uiId: "ecommerce-pack",
        icon: icons.ecommerceApparel,
        limitText: `Limit: ${maxQuantity || "Unlimited"} Store${
          maxQuantity !== 1 ? "s" : ""
        }`,
        maxQuantity,
      };
    case "PRIORITY_SUPPORT":
      return {
        uiId: "priority-support",
        icon: icons.customerSupport,
        limitText: `Limit: ${maxQuantity || "Unlimited"} Allowed`,
        maxQuantity,
      };
    case "RESELLER_AGENCY_PORTAL":
      return {
        uiId: "reseller-portal",
        icon: icons.websiteActive,
        limitText: `Limit: ${maxQuantity || "Unlimited"}`,
        maxQuantity,
      };
    default:
      return {
        uiId: `addon-unknown`,
        icon: icons.greenCreditCard,
        limitText: `Limit: ${maxQuantity || "Unlimited"}`,
        maxQuantity,
      };
  }
};

const transformPurchasedAddonToAddon = (
  purchasedAddon: PurchasedAddon,
  icons: ReturnType<typeof useSupabaseIcons>,
): Addon => {
  const { uiId, icon, limitText } = getUiIdAndIcon(
    purchasedAddon.addonDefinition.type,
    icons,
  );
  const price = purchasedAddon.addonDefinition.priceEur / 100;

  return {
    id: uiId,
    name: purchasedAddon.addonDefinition.name,
    price: price,
    priceText: `Price: £${price}/month`,
    limit: purchasedAddon.addonDefinition.maxQuantity || 9999,
    limitText: limitText,
    icon: icon,
    addonType: purchasedAddon.addonDefinition.type,
    used: purchasedAddon.quantity,
  };
};

export const usePurchasedAddons = () => {
  const icons = useSupabaseIcons();

  const { data, isLoading, error, refetch, isFetching } =
    useAppQuery<PurchasedAddonsResponse>(
      ["purchasedAddons"],
      () => api.get("/addon/purchased"),
      {
        enabled: true,
      },
    );

  const purchasedAddons: Addon[] = useMemo(() => {
    if (!data?.addons) return [];
    return data.addons.map((addon) =>
      transformPurchasedAddonToAddon(addon, icons),
    );
  }, [data, icons]);

  return {
    purchasedAddons,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
