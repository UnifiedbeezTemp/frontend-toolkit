
import { OriginalPlan } from "../types"
import BadgeIcon from "../../ui/BadgeIcon"
import usePlanIcons, { usePlanBgColorClassNames } from "../hooks/usePlanStyling"

export default function PlanIcon({
  planTier,
  className,
}: {
  planTier: OriginalPlan["planType"]
  className?: string
}) {
  const getPlanIcon = usePlanIcons()
  const getPlanBgColorClassName = usePlanBgColorClassNames()
  return (
    <BadgeIcon
      icon={getPlanIcon(planTier) || ""}
      className={`${className} ${getPlanBgColorClassName(planTier)}`}
      hasPattern
    />
  )
}
