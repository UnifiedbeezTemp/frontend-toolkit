
import { OriginalPlan } from "../types"
import BadgeIcon from "../../ui/BadgeIcon"
import usePlanIcons, { usePlanBgColorClassNames } from "../hooks/usePlanStyling"

export default function PlanIcon({
  planType,
  className,
}: {
  planType: OriginalPlan["planType"]
  className?: string
}) {
  const getPlanIcon = usePlanIcons()
  const getPlanBgColorClassName = usePlanBgColorClassNames()
  return (
    <BadgeIcon
      icon={getPlanIcon(planType) || ""}
      className={`${className} ${getPlanBgColorClassName(planType)}`}
      hasPattern
    />
  )
}
