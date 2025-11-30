import Button from "../../ui/Button"
import Heading from "../../ui/Heading"
import { PlanSummaryCardProps } from "../types"
import PlanAddOns from "./PlanAddons"
import PlanIcon from "./PlanIcon"
import PlanPricingAndInterval from "./PlanPricingAndInterval"
import PlanSummaryActions from "./PlanSummaryActions"
import PlanSummaryContainer from "./PlanSummaryContainer"
import PlanTag from "./PlanTag"

export default function PlanSummaryCTATop({
  plan,
  isOwnPlan,
  className,
}: PlanSummaryCardProps) {
  return (
    <PlanSummaryContainer className={className}>
      <div className="flex flex-wrap justify-between w-full gap-8">
        <div className="flex flex-col justify-between items-start gap-11 lg:gap-13.5 w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col mr-auto">
            <div className="flex flex-wrap items-center gap-2.5">
                <PlanIcon
                  planTier={plan.planType}
                  className="-mt-2 -ml-1.5 w-max scale-[0.6666]"
                />
                <div className="flex items-center gap-4.5 -mt-1.5">
                  <Heading
                    as="h4"
                    className="capitalize text-[1.8rem] text-dark-base-100"
                  >
                    {plan.planType} Plan
                  </Heading>
                  <PlanTag plan={plan} isOwnPlan={isOwnPlan} />
                </div>
              </div>
              <PlanPricingAndInterval plan={plan} />
            </div>
            <div className="hidden md:block">
              <PlanSummaryActions plan={plan} />
            </div>
          </div>

          <div>
            <Button
              variant="secondary"
              className="bg-white text-[1rem] font-bold leading-base py-1.5 px-2.25 mt-auto mb-2"
            >
              Add-ons
            </Button>
            <PlanAddOns plan={plan} />
          </div>
           <div className="block md:hidden w-full">
              <PlanSummaryActions plan={plan} />
            </div>
        </div>
      </div>
    </PlanSummaryContainer>
  )
}