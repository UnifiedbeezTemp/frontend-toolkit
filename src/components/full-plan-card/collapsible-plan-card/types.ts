import { Plan } from "../../../api/services/plan/types";


export interface CollapsiblePlanCardProps {
  plan: Plan;
  isYearly: boolean;
  isSelected: boolean;
  isLowerThanCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
  defaultExpanded?: boolean;
  className?: string;
}