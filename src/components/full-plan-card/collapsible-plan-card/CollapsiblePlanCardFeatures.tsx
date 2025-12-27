import Text from "../../ui/Text";
import { Plan } from "../../../api/services/plan/types";

interface CollapsiblePlanCardFeaturesProps {
  plan: Plan;
}

export default function CollapsiblePlanCardFeatures({
  plan,
}: CollapsiblePlanCardFeaturesProps) {
  const allFeatures = [...plan.availableFeatures.filter((_feature, idx) => idx > 1), ...plan.unAvailableFeatures];

  return (
    <>
      {allFeatures.map((feature, idx) => (
        <div
          key={idx}
          className="py-4 px-5.25"
        >
          <p className="text-md text-dark-base-70 text-inherit">
            {feature}
          </p>
        </div>
      ))}
    </>
  );
}

