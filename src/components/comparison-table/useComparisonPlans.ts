import { usePlans } from "../../api/services/plan/hooks/usePlans";
import { useUserPlan } from "../../api/services/plan/hooks/useUserPlan";
import { ComparisonPlan } from "./types";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useMemo } from "react";
import { getPlansData } from "../../data/plansData";

const PLAN_HIERARCHY: Record<string, number> = {
  individual: 1,
  business: 2,
  premium: 3,
  organisation: 4,
};

const getDynamicCtaText = (
  planId: string,
  planName: string,
  currentPlanId: string | undefined,
  isCurrentPlan: boolean,
): string => {
  if (isCurrentPlan) {
    return "Current Plan";
  }

  if (planId === "organisation") {
    return "Talk to Sales";
  }

  if (!currentPlanId) {
    if (planId === "business") return `Choose ${planName}`;
    if (planId === "premium") return `Upgrade to ${planName}`;
    return `Start with ${planName}`;
  }

  const currentRank = PLAN_HIERARCHY[currentPlanId] || 0;
  const targetRank = PLAN_HIERARCHY[planId] || 0;

  if (targetRank < currentRank) {
    return `Downgrade to ${planName}`;
  }

  return `Upgrade to ${planName}`;
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

    const mappedPlans = getPlansData(apiPlans, icons);
    const userPlanType = userPlan?.planType?.toLowerCase();

    return mappedPlans.map((plan): ComparisonPlan => {
      const original = plan.originalPlan;

      const formatSeats = (seats: number | null) =>
        seats === null
          ? "Unlimited Seats"
          : `${seats} Seat${seats !== 1 ? "s" : ""}`;

      const formatAiAssistants = (assistants: number | null) =>
        assistants === null
          ? "Unlimited AI Assistants"
          : `${assistants} AI Assistant${assistants !== 1 ? "s" : ""}`;

      const getChannels = (p: typeof original) => {
        const channels = [];
        if (p.hasFacebookMessenger) channels.push("Facebook");
        if (p.hasLinkedinMessenger) channels.push("LinkedIn");
        if (p.hasTelegram) channels.push("Telegram");
        if (p.hasWebchat) channels.push("Web Chat");
        if (p.maxWhatsappChannels > 0) channels.push("WhatsApp");
        return channels.join(", ");
      };

      const isCurrentPlan = !isUnauthenticated && userPlanType === plan.id;

      return {
        id: plan.id,
        name: plan.title,
        description: plan.description,
        iconKey: "",
        badge: plan.badge,
        addonStatus: plan.addonAvailable
          ? "Add-on available"
          : "Add-on not available",
        addonAvailable: plan.addonAvailable,
        tag: plan.tag,
        values: {
          monthlyPrice: `£${plan.monthlyPrice}/month`,
          seats: formatSeats(original.maxSeats),
          aiAssistants: formatAiAssistants(original.maxAiAssistants),
          channels: getChannels(original),
          support: original.supportLevel.replace("_", " "),
          crm: original.hasCrmCalendarSync ? "Included" : "Not Included",
          ecommerce: original.hasEcommercePack ? "Included" : "Not Included",
          addons: plan.addonAvailable ? "Add-ons allowed" : "No Add-ons",
        },
        ctaText: getDynamicCtaText(
          plan.id,
          plan.title,
          userPlanType,
          isCurrentPlan,
        ),
        footerText: plan.footerText,
        footerIcon: plan.footerIcon,
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
