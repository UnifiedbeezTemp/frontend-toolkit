import { useSupabaseIcons } from "../../../lib/supabase/useSupabase"

export const PLAN_TYPES = [
  "individual",
  "business",
  "premium",
  "organisation",
  "organization",
] as const

type PlanType = (typeof PLAN_TYPES)[number]

function normalizePlanType(input: string): PlanType | undefined {
  const normalized = input.toLowerCase()
  return PLAN_TYPES.find((p) => p === normalized)
}

export default function usePlanIcons() {
  const { userWhite, luggage, gem, userGroup3 } = useSupabaseIcons()

  const ICONS: Record<PlanType, string> = {
    individual: userWhite,
    business: luggage,
    premium: gem,
    organisation: userGroup3,
    organization: userGroup3,
  }

  return (planType: string) => {
    const key = normalizePlanType(planType)
    return key ? ICONS[key] : undefined
  }
}

export function usePlanBgColorClassNames() {
  const COLORS: Record<PlanType, string> = {
    individual: "bg-brand-primary",
    business: "bg-text-secondary",
    premium: "bg-warning",
    organisation:
    "bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]",
    organization:
    "bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]",
  }

  return (planType: string) => {
    const key = normalizePlanType(planType)
    return key ? COLORS[key] : undefined
  }
}
