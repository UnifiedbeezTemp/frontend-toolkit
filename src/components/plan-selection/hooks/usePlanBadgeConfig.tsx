import { useMemo } from "react";
import BadgeIcon from "../../ui/BadgeIcon";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const usePlanBadgeConfig = (planType: string | null) => {
  const icons = useSupabaseIcons();

  const config = useMemo(() => {
    const type = planType?.toLowerCase() || "";

    const configs: Record<string, { badge: React.ReactNode; title: string }> = {
      individual: {
        badge: (
          <BadgeIcon
            icon={icons.userWhite}
            hasPattern
            className="bg-brand-primary"
          />
        ),
        title: "Individual",
      },
      business: {
        badge: (
          <BadgeIcon
            icon={icons.luggage}
            hasPattern
            className="bg-text-secondary"
          />
        ),
        title: "Business",
      },
      premium: {
        badge: <BadgeIcon icon={icons.gem} hasPattern className="bg-warning" />,
        title: "Premium",
      },
      organisation: {
        badge: (
          <BadgeIcon
            icon={icons.userGroup3}
            hasPattern={false}
            className="bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]"
          />
        ),
        title: "Organisation",
      },
    };

    return configs[type] || { badge: null, title: planType || "" };
  }, [planType, icons]);

  return config;
};
