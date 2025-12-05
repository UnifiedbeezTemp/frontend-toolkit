import { OriginalPlan } from "../types";


export default function PlanTag({ plan, isOwnPlan }: { plan: OriginalPlan; isOwnPlan?: boolean }) {
  const planTitle = isOwnPlan ? "Your Plan" : plan.name
  return (
    <span className="px-1.5 py-0.5 text-[0.8rem] lg:text-xs font-normal lg:font-bold border rounded-full bg-primary-100/5 text-primary-100 border-primary-100">
      {planTitle}
    </span>
  )
}