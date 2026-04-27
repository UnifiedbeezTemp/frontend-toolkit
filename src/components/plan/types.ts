import { OriginalPlan as _OriginalPlan } from "../../api/services/plan/types";
import { Addon as PurchasedAddon } from "../../store/onboarding/types/addonTypes";

export type OriginalPlan = _OriginalPlan
export interface Plan {
  id: string;
  title: string;
  description: string;
  tag: React.ReactNode;
  badge: React.ReactNode;
  monthlyPrice: number;
  addonAvailable: boolean;
  availableFeatures: string[];
  unAvailableFeatures: string[];
  ctaText: string;
  footerText: string;
  footerIcon: string;
  originalPlan: OriginalPlan;
}

export type Pricing = {
  amount: number
  currency: string
  interval: "month" | "year"
}

export type FeatureInfo = {
  highlight: string
  compareUrl: string
}

export type Addon = {
  id: string
  name: string
  quantity: number
  pricePerUnit: number
}


export interface PlanSummaryCardProps {
  plan: OriginalPlan
  className?: string
  isOwnPlan?: boolean
  showHighlightOfPlan?: boolean
  isLoading?: boolean
  isUpgradePlanDisabled: boolean
  purchasedAddons?: PurchasedAddon[]
  onAddonsClick?: () => void
  onSelect?: () => void
}


