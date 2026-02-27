import { getPlansData } from "../../../data/plansData";
import { useToggle } from "../../../hooks/useToggle";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import PlanPreviewModal from "../../plancard-preview/components/PlanPreviewModal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { PlanSummaryCardProps } from "../types";
import PlanAddOns from "./PlanAddons";
import PlanIcon from "./PlanIcon";
import PlanPricingAndInterval from "./PlanPricingAndInterval";
import PlanSummaryActions from "./PlanSummaryActions";
import PlanSummaryContainer from "./PlanSummaryContainer";
import PlanSummarySkeleton from "./PlanSummarySkeleton";
import PlanTag from "./PlanTag";

import { useUser } from "../../../contexts/UserContext";

export default function PlanSummaryCTATop({
  plan,
  isOwnPlan,
  className,
  isLoading,
  isUpgradePlanDisabled,
  onAddonsClick = () => {},
  onSelect = () => {},
}: PlanSummaryCardProps) {
  const icons = useSupabaseIcons();
  const { user } = useUser();
  const {
    value: showDetails,
    setFalse: handleClose,
    setTrue: handleOpen,
  } = useToggle();

  const isYearly = user?.planBillingInterval === "YEARLY";
  const totalPrice = isYearly ? plan.yearlyPriceEur || 0 : plan.priceEur;

  if (isLoading) return <PlanSummarySkeleton />;
  return (
    <>
      <PlanPreviewModal
        isOpen={showDetails}
        onClose={handleClose}
        plan={getPlansData([plan], icons)[0]}
        isYearly={isYearly}
        totalPrice={totalPrice}
        onAddonsClick={onAddonsClick}
        onSelect={onSelect}
      />
      <PlanSummaryContainer className={className}>
        <div className="flex flex-wrap justify-between w-full gap-8">
          <div className="flex flex-col justify-between items-start gap-11 lg:gap-13.5 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col mr-auto">
                <div className="flex flex-wrap items-center gap-2.5">
                  <PlanIcon
                    planType={plan.planType}
                    className="-mt-2 -ml-1.5 w-max scale-[0.6666]"
                  />
                  <div className="flex items-center gap-4.5 -mt-1.5">
                    <Heading
                      as="h4"
                      className="capitalize text-[1.8rem] text-dark-base-100"
                    >
                      {plan.name} Plan
                    </Heading>
                    <PlanTag plan={plan} isOwnPlan={isOwnPlan} />
                  </div>
                </div>
                <PlanPricingAndInterval
                  plan={plan}
                  isYearly={isYearly}
                  price={totalPrice}
                />
              </div>
              <div className="hidden md:block">
                <PlanSummaryActions
                  plan={plan}
                  onUpgradePlan={onSelect}
                  isUpgradePlanDisabled={isUpgradePlanDisabled}
                  handleMoreClick={handleOpen}
                />
              </div>
            </div>

            <div>
              {plan.addons && plan.addons.length > 0 && (
                <>
                  <Button
                    variant="secondary"
                    className="bg-primary text-[1rem] font-bold leading-base py-1.5 px-2.25 mt-auto mb-2"
                  >
                    Add-ons
                  </Button>
                  <PlanAddOns plan={plan} />
                </>
              )}
            </div>
            <div className="block md:hidden w-full">
              <PlanSummaryActions
                plan={plan}
                onUpgradePlan={onSelect}
                isUpgradePlanDisabled={isUpgradePlanDisabled}
                handleMoreClick={handleOpen}
              />
            </div>
          </div>
        </div>
      </PlanSummaryContainer>
    </>
  );
}
