"use client";

import { CreditStats } from "../hooks/useCreditSettings";
import CreditRemainingCard from "./CreditRemainingCard";
import BonusCreditsCard from "./BonusCreditsCard";

interface CreditSummaryProps {
  stats: CreditStats;
  onPurchase: () => void;
}

export default function CreditSummary({
  stats,
  onPurchase,
}: CreditSummaryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.6rem]">
      <CreditRemainingCard stats={stats} onPurchase={onPurchase} />
      <BonusCreditsCard bonusCredits={stats.bonusCredits} />
    </div>
  );
}
