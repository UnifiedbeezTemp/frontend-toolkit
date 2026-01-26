import { Plan } from "../../../api/services/plan/types";


export interface CollapsiblePlanCardProps {
  plan: Plan;
  isYearly: boolean;
  isSelected: boolean;
  isLowerThanCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
  handleAddonClick: () => void;
  defaultExpanded?: boolean;
  className?: string;
  isSelectionDisabled?: boolean
  isCurrentPlan?: boolean
}