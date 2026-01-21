import { Plan } from "../../api/services/plan/types";
import Heading from "../ui/Heading";
import Text from "../ui/Text";

interface PlanCardTitleProps {
  plan: Plan;
}

export default function PlanCardTitle({ plan }: PlanCardTitleProps) {
  return (
    <div className="mt-[1rem]">
      <Heading className="text-brand-primary flex items-center gap-[0.5rem] text-[1.8rem] flex-wrap">
        {plan.title} Plan {plan.tag}
      </Heading>
      <Text size="xs" className="font-[700] text-[1rem]">
        {plan.description}
      </Text>
    </div>
  );
}
