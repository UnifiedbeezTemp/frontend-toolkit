import { useCallback } from "react"



export const PLAN_TIER_RANK: Record<string, number> = {
  individual: 1,
  business: 2,
  premium: 3,
  organisation: 4,
}

export default function useGetPlanRank() {
  const getPlanRank = useCallback((planType: string): number => {
    return PLAN_TIER_RANK[planType.toLowerCase()] ?? 0
  }, [])

  const isPlanLowerThanCurrent = useCallback((
    planType: string,
    currentPlanType: string | undefined
  ): boolean => {
    if (!currentPlanType) return false
    return getPlanRank(planType) < getPlanRank(currentPlanType)
  }, [getPlanRank])
  return { isPlanLowerThanCurrent, getPlanRank }
}