import { OriginalPlan, Plan } from "../api/services/plan/types";
import BadgeIcon from "../components/ui/BadgeIcon";
import { useSupabaseIcons } from "../lib/supabase/useSupabase";

export const transformOriginalPlan = (
  originalPlan: OriginalPlan,
  icons: ReturnType<typeof useSupabaseIcons>
): Plan => {
  const planType = originalPlan.planType.toLowerCase();

  const formatSeats = (seats: number | null) =>
    seats === null
      ? "Unlimited Seats"
      : `${seats} Seat${seats !== 1 ? "s" : ""}`;

  const formatAiAssistants = (assistants: number | null) =>
    assistants === null
      ? "Unlimited AI Assistants"
      : `${assistants} AI Assistant${assistants !== 1 ? "s" : ""}`;

  const getChannels = (plan: OriginalPlan) => {
    const channels = [];
    if (plan.hasFacebookMessenger) channels.push("Facebook");
    if (plan.hasLinkedinMessenger) channels.push("LinkedIn");
    if (plan.hasTelegram) channels.push("Telegram");
    if (plan.hasWebchat) channels.push("Web Chat");
    if (plan.maxWhatsappChannels > 0) channels.push("WhatsApp");
    return channels.join(", ");
  };

  const planConfigs = {
    individual: {
      tag: <></>,
      badge: (
        <BadgeIcon
          icon={icons.userWhite}
          hasPattern
          className="bg-brand-primary"
        />
      ),
      ctaText: "Start with individual",
      footerText: "Stripe Checkout only (no add-ons)",
    },
    business: {
      tag: (
        <span className="text-[1rem] font-[700] text-white bg-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
          Most Popular
        </span>
      ),
      badge: (
        <BadgeIcon
          icon={icons.luggage}
          hasPattern
          className="bg-text-secondary"
        />
      ),
      ctaText: "Choose Business",
      footerText: "Stripe Billing + Add-ons enabled",
    },
    premium: {
      tag: (
        <span className="text-[1rem] font-[700] bg-warning text-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
          Best Value
        </span>
      ),
      badge: <BadgeIcon icon={icons.gem} hasPattern className="bg-warning" />,
      ctaText: "Upgrade to Premium",
      footerText: "Stripe Billing",
    },
    organisation: {
      tag: (
        <div className="text-[1rem] font-[700] bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)] text-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
          Enterprise Ready
        </div>
      ),
      badge: (
        <BadgeIcon
          icon={icons.userGroup3}
          hasPattern={false}
          className="bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]"
        />
      ),
      ctaText: "Talk to Sales",
      footerText: "Stripe Billing",
    },
  };

  const config =
    planConfigs[planType as keyof typeof planConfigs] || planConfigs.individual;

  const availableFeatures = [
    formatSeats(originalPlan.maxSeats),
    formatAiAssistants(originalPlan.maxAiAssistants),
    `Channels: ${getChannels(originalPlan)}`,
    `Support: ${originalPlan.supportLevel.replace("_", " ").toLowerCase()}`,
    ...(originalPlan.maxWhatsappChannels > 0
      ? [
          `${originalPlan.maxWhatsappChannels} WhatsApp Channel${
            originalPlan.maxWhatsappChannels !== 1 ? "s" : ""
          } Included`,
        ]
      : []),
    ...(originalPlan.hasCrmCalendarSync
      ? ["CRM / Calendar Sync: Included"]
      : []),
    ...(originalPlan.hasEcommercePack ? ["Ecommerce Pack: Included"] : []),
    ...(originalPlan.canPurchaseAddons ? ["Add-Ons: Allowed"] : []),
  ];

  const unAvailableFeatures = [
    ...(!originalPlan.hasCrmCalendarSync ? ["CRM/Calendar Sync"] : []),
    ...(!originalPlan.hasEcommercePack
      ? ["E-commerce Pack: Not Included"]
      : []),
    ...(!originalPlan.canPurchaseAddons ? ["Add-Ons: No access"] : []),
  ];

  return {
    id: originalPlan.planType.toLowerCase(),
    title: originalPlan.name,
    description: `${originalPlan.name} for custom AI & Chat Automation`,
    tag: config.tag,
    badge: config.badge,
    monthlyPrice: originalPlan.priceEur,
    addonAvailable: originalPlan.canPurchaseAddons,
    availableFeatures,
    unAvailableFeatures,
    ctaText: config.ctaText,
    footerText: config.footerText,
    footerIcon: icons.stripeIconCircle,
    originalPlan: originalPlan,
  };
};

export const getPlansData = (
  originalPlans: OriginalPlan[],
  icons: ReturnType<typeof useSupabaseIcons>
): Plan[] => {
  return originalPlans?.map((plan) => transformOriginalPlan(plan, icons));
};

export const getPlanByType = (
  originalPlan: OriginalPlan,
  icons: ReturnType<typeof useSupabaseIcons>
): Plan => {
  return transformOriginalPlan(originalPlan, icons);
};
