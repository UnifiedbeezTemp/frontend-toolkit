"use client";

import { cn } from "../../../lib/utils";
import Button from "../../ui/Button";
import DotsMenu from "../../ui/DotsMenu";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

interface PlanPreviewPricingProps {
  totalPrice: number;
  addonsTotal: number;
  isYearly: boolean;
  isOneSided: boolean;
  planType?: string;
  isMenuOpen: boolean;
  onUpgradeClick: () => void;
  onMenuToggle: () => void;
  onSeeDetailsClick: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export default function PlanPreviewPricing({
  totalPrice,
  addonsTotal,
  isYearly,
  isOneSided,
  planType,
  isMenuOpen,
  onUpgradeClick,
  onMenuToggle,
  onSeeDetailsClick,
  menuRef,
}: PlanPreviewPricingProps) {
  const icons = useSupabaseIcons();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-col-reverse gap-[1rem] sm:justify-between",
        isOneSided
          ? "w-full sm:w-[50%] lg:w-[40%] sm:flex-col lg:items-end"
          : "sm:flex-col-reverse"
      )}
    >
      <div className="sm:mb-[-1rem] md:text-right">
        <span className="text-[4rem] font-[700] text-brand-primary">
          £{totalPrice}
        </span>
        <span className="text-[1rem] font-[700] text-text-primary">
          /per {isYearly ? "year" : "month"}
        </span>
      </div>

      <div className="flex gap-[1rem] w-full">
        {planType?.toLowerCase() === "organisation" ? (
          <div className="w-full px-[1.6rem] py-[1.2rem] bg-brand-primary text-white text-center rounded-[0.8rem] font-[700] text-[1.4rem]">
            Talk to Sales
          </div>
        ) : (
          <Button
            className={cn(" px-[1.6rem]", isOneSided ? "w-full" : "w-full")}
            onClick={onUpgradeClick}
          >
            Upgrade Plan
          </Button>
        )}
        <div className="relative" ref={menuRef}>
          <Button variant="secondary" className="h-full" onClick={onMenuToggle}>
            <DotsMenu />
          </Button>
          {isMenuOpen && (
            <button
              onClick={onSeeDetailsClick}
              className="absolute right-0 bottom-[-100%] flex items-center gap-[1rem] bg-primary w-[15rem] border border-input-stroke p-[0.8rem] rounded-[0.4rem] text-text-primary text-[1.4rem] hover:bg-gray-50 transition-colors z-10"
            >
              <ImageComponent
                src={icons.linkExternal}
                alt=""
                width={15}
                height={15}
                className="grayscale opacity-70"
              />
              See plan details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
