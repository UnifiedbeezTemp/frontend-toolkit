import { Plan } from "../../api/services/plan/types";
import Text from "../ui/Text";

interface PlanCardPricingProps {
  plan: Plan;
  displayPrice: number;
  isYearly: boolean;
}

export default function PlanCardPricing({
  plan,
  displayPrice,
  isYearly,
}: PlanCardPricingProps) {
  return (
    <div className="pb-[1rem]">
      <p>
        <span className="text-[4rem] font-[700] text-brand-primary">
          £{displayPrice}
        </span>
        <span className="text-[1rem] font-[700] text-text-primary">
          /per {isYearly ? "year" : "month"}
        </span>
      </p>
      {isYearly && (
        <Text size="xs" className="text-success font-[700]">
          Save 15% yearly
        </Text>
      )}
    </div>
  );
}
