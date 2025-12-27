import { Addon } from "../../store/onboarding/types/addonTypes";

export interface PlanCardPreviewProps {
  isAddons: boolean;
  selectedAddons?: Addon[];
  planType?: string;
  isYearly: boolean;
  isOneSided?: boolean;
}
