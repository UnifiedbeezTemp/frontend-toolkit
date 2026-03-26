import React, { useMemo } from "react";
import { usePlans } from "../../api/services/plan/hooks/usePlans";
import { useUserPlan } from "../../api/services/plan/hooks/useUserPlan";
import { ComparisonPlan } from "./types";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import BadgeIcon from "../ui/BadgeIcon";
import { calculateBillingCyclePrice } from "../../utils/priceUtils";

const PLAN_HIERARCHY: Record<string, number> = {
  individual: 1,
  business: 2,
  premium: 3,
  organisation: 4,
};

export const useComparisonPlans = () => {
  const { plans: apiPlans, loading, error, retry } = usePlans();
  const {
    userPlan,
    loading: userPlanLoading,
    isUnauthenticated,
  } = useUserPlan();
  const icons = useSupabaseIcons();

  const comparisonPlans: ComparisonPlan[] = useMemo(() => {
    if (!apiPlans || apiPlans.length === 0) return [];

    const userPlanType = userPlan?.planType?.toLowerCase();

    return apiPlans.map((original): ComparisonPlan => {
      const planType = original.planType.toLowerCase();

      const getContactsValue = () => {
        if (planType === "individual") return "1,000";
        if (planType === "business") return "5,000";
        if (planType === "premium") return "25,000";
        if (planType === "organisation") return "100,000";
        return "0";
      };

      const getMonthlyEmailsValue = () => {
        if (planType === "individual") return "5,000";
        if (planType === "business") return "25,000";
        if (planType === "premium") return "100,000";
        if (planType === "organisation") return "250,000";
        return "0";
      };

      const getWhatsappApiValue = () => {
        if (planType === "individual") return "Not Included";
        if (planType === "business") return "1 Included";
        if (planType === "premium") return "3 Included";
        if (planType === "organisation") return "5 Included";
        return "Not Included";
      };

      const formatSeats = (seats: number | null) => {
        if (planType === "organisation") return "50 Seats - Then Unlimited";
        if (planType === "premium") return "20 Seats";
        if (planType === "business") return "5 Seats";
        return seats === null
          ? "Unlimited Seats"
          : `${seats} Seat${seats !== 1 ? "s" : ""}`;
      };

      const formatAiAssistants = (assistants: number | null) => {
        if (planType === "premium")
          return "5 Included (Unlimited Add-ons with £25/extra)";
        if (planType === "organisation")
          return "10 Included (Unlimited Add-ons with £25/extra)";
        if (planType === "business") return "2 AI Assistants";
        return assistants === null
          ? "Unlimited AI Assistants"
          : `${assistants} AI Assistant${assistants !== 1 ? "s" : ""}`;
      };

      const getChannels = (p: typeof original) => {
        if (["premium", "organisation"].includes(planType)) {
          return "All supported channels";
        }
        if (planType === "individual") return "Facebook, Telegram, Messenger";
        if (planType === "business") return "Facebook, Telegram, WhatsApp";

        const channels = [];
        if (p.hasFacebookMessenger) channels.push("Facebook");
        // if (p.hasLinkedinMessenger) channels.push("LinkedIn");
        if (p.hasTelegram) channels.push("Telegram");
        if (p.hasWebchat) channels.push("Web Chat");
        if (p.maxWhatsappChannels > 0) channels.push("WhatsApp");
        return channels.join(", ");
      };

      const isCurrentPlan = !isUnauthenticated && userPlanType === planType;

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
          ctaText: "Start with Individual",
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
          badge: (
            <BadgeIcon icon={icons.gem} hasPattern className="bg-warning" />
          ),
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
        planConfigs[planType as keyof typeof planConfigs] ||
        planConfigs.individual;

      return {
        id: planType,
        name: original.name,
        description: `${original.name} for custom AI & Chat Automation`,
        iconKey: "",
        badge: config.badge,
        addonStatus: original.canPurchaseAddons
          ? "Add-on available"
          : "Add-on not available",
        addonAvailable: original.canPurchaseAddons,
        tag: config.tag,
        values: {
          monthlyPrice: `£${original.priceEur / 100}/month`,
          yearlyPrice: `£${
            (original.yearlyPriceEur ??
              calculateBillingCyclePrice(original.priceEur, true)) / 100
          }/year`,
          seats: formatSeats(original.maxSeats),
          aiAssistants: formatAiAssistants(original.maxAiAssistants),
          contacts: getContactsValue(),
          monthlyEmails: getMonthlyEmailsValue(),
          channels: getChannels(original),
          whatsappApi: getWhatsappApiValue(),
          support:
            planType === "premium" || planType === "organisation"
              ? "Priority"
              : "Email Support",
          crm:
            planType === "business"
              ? "Optional (£20/mo)"
              : original.hasCrmCalendarSync
                ? "Included"
                : "Not Included",
          ecommerce:
            planType === "business"
              ? "Optional (£25/mo)"
              : original.hasEcommercePack
                ? "Included"
                : "Not Included",
          addons: original.canPurchaseAddons ? "Add-ons allowed" : "No Add-ons",
          automationsDashboard:
            planType === "premium" || planType === "organisation"
              ? "Included"
              : "No Access",
        },
        ctaText: config.ctaText,
        footerText: config.footerText,
        footerIcon: icons.stripeIconCircle || undefined,
        isCurrentPlan,
      };
    });
  }, [apiPlans, icons, userPlan, isUnauthenticated]);

  return {
    plans: comparisonPlans,
    loading: loading || userPlanLoading,
    error,
    retry,
    icons,
  };
};
