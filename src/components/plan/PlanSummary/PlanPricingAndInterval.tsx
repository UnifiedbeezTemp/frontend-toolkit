import { OriginalPlan } from "../types";

export default function PlanPricingAndInterval({
  plan,
  isYearly,
  price,
}: {
  plan: OriginalPlan;
  isYearly: boolean;
  price: number;
}) {
  return (
    <div className="text-right flex items-baseline">
      <p className="text-3xl font-semibold text-primary-100">£{price}</p>
      &nbsp;&nbsp;
      <p className="text-dark-base-70 font-bold text-base leading-base -mt-2">
        /per {isYearly ? "year" : "month"}
      </p>
    </div>
  );
}
