import { OriginalPlan, Plan } from "../api/services/plan/types";
import BadgeIcon from "../components/ui/BadgeIcon";
import { useSupabaseIcons } from "../lib/supabase/useSupabase";

export const transformOriginalPlan = (
  originalPlan: OriginalPlan,
  icons: ReturnType<typeof useSupabaseIcons>,
): Plan => {
  const planType = originalPlan.planType.toLowerCase();

  const formatSeats = (seats: number | null) => {
    if (planType === "organisation") {
      return "50 Seats - Unlimited";
    }
    return seats === null
      ? "Unlimited Seats"
      : `${seats} Seat${seats !== 1 ? "s" : ""}`;
  };

  const formatAiAssistants = (assistants: number | null) => {
    if (planType === "premium") {
      return "AI Assistant: 5 Included (Unlimited Add-ons with £25/extra)";
    }
    if (planType === "organisation") {
      return "AI Assistant: 10 Included (Unlimited Add-ons with £25/extra)";
    }
    return assistants === null
      ? "Unlimited AI Assistants"
      : `${assistants} AI Assistant${assistants !== 1 ? "s" : ""}`;
  };

  const getChannels = (plan: OriginalPlan) => {
    if (["premium", "organisation"].includes(planType)) {
      return "Channels: All supported channels";
    }
    const channels = [];
    if (plan.hasFacebookMessenger) channels.push("Facebook");
    if (plan.hasLinkedinMessenger) channels.push("LinkedIn");
    if (plan.hasTelegram) channels.push("Telegram");
    if (plan.hasWebchat) channels.push("Web Chat");
    if (plan.maxWhatsappChannels > 0) channels.push("WhatsApp");
    return `Channels: ${channels.join(", ")}`;
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
    getChannels(originalPlan),
    `Support: ${originalPlan.supportLevel
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())}`,
    ...(originalPlan.hasCrmCalendarSync
      ? ["CRM / Calendar Sync: Included"]
      : planType === "business"
        ? ["CRM / Calendar Sync: Optional ( £20/month )"]
        : []),
    ...(originalPlan.hasEcommercePack
      ? ["E-commerce Pack: Included"]
      : planType === "business"
        ? ["Ecommerce Pack: Optional ( £25/month )"]
        : []),
    ...(originalPlan.canPurchaseAddons ? ["Add-Ons: Allowed"] : []),
  ];

  const unAvailableFeatures = [
    ...(!originalPlan.hasCrmCalendarSync && planType !== "business"
      ? ["CRM / Calendar Sync: Not Included"]
      : []),
    ...(!originalPlan.hasEcommercePack && planType !== "business"
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
    monthlyPrice: originalPlan.priceEur / 100,
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
  icons: ReturnType<typeof useSupabaseIcons>,
): Plan[] => {
  return originalPlans?.map((plan) => transformOriginalPlan(plan, icons));
};

export const getPlanByType = (
  originalPlan: OriginalPlan,
  icons: ReturnType<typeof useSupabaseIcons>,
): Plan => {
  return transformOriginalPlan(originalPlan, icons);
};
