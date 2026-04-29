"use client";

import ImageComponent from "next/image";
import { Plan } from "../../../api/services/plan/types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { cn } from "../../../lib/utils";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Heading from "../../ui/Heading";
import PlanPreviewAddons from "./PlanPreviewAddons";
import PlanPreviewPricing from "./PlanPreviewPricing";

interface PlanCardPreviewDisplayProps {
  plan: Plan;
  isAddons: boolean;
  planType?: string;
  addonsTotal: number;
  totalPrice: number;
  selectedAddons?: Addon[];
  bulkSeatsCount?: number;
  isYearly: boolean;
  isOneSided?: boolean;
  className?: string;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onAddonsClick: () => void;
  onComparePlansClick: (event?: React.MouseEvent) => void;
  onUpgradeClick: () => void;
  onMenuToggle: () => void;
  onSeeDetailsClick: () => void;
  actionLabel?: string;
  isActionDisabled?: boolean;
}

export default function PlanCardPreviewDisplay({
  plan,
  isAddons,
  planType,
  addonsTotal,
  totalPrice,
  selectedAddons,
  bulkSeatsCount,
  isYearly,
  isOneSided = false,
  className,
  isMenuOpen,
  menuRef,
  onAddonsClick,
  onComparePlansClick,
  onUpgradeClick,
  onMenuToggle,
  onSeeDetailsClick,
  actionLabel,
  isActionDisabled,
}: PlanCardPreviewDisplayProps) {
  const icons = useSupabaseIcons();

  return (
    <div
      className={cn(
        "border border-input-stroke p-[1rem] rounded-[1rem] mt-[2.3rem] layout-body shadow flex flex-col gap-[3.1rem]",
        isOneSided
          ? " sm:flex-col lg:flex-row lg:justify-between"
          : " sm:flex-row",
        className,
      )}
    >
      <div className={cn("flex-1", isOneSided ? "sm:w-[50%]" : "w-full")}>
        <div>{plan.badge}</div>

        <div className="flex items-center gap-[1rem] mt-[1rem]">
          <Heading className="text-[2rem] sm:text-[2.4rem]">
            {plan.title}
          </Heading>

          <div className="border border-brand-primary rounded-full text-brand-primary p-[0.5rem] py-[0.2rem] text-[1rem] bg-brand-primary/5 sm:text-[1.2rem] sm:font-[700]">
            Your plan
          </div>
        </div>

        <div
          className={cn(
            "flex text-[1.4rem] flex-col mt-[1rem] gap-[1.3rem] sm:gap-[0.4rem]",
            isOneSided ? "sm:flex-col lg:flex-row" : "sm:flex-row",
          )}
        >
          <p
            className={cn(
              "whitespace-nowrap",
              isOneSided
                ? "sm:flex-col lg:flex lg:flex-row items-end"
                : "sm:flex sm:flex-row gap-[0.4rem] text-[1.4rem]",
            )}
          >
            The most important {isOneSided && <br className="hidden lg:inline"/>}features of your plan.{" "}
            <button
              onClick={onComparePlansClick}
              className="underline font-[700] text-brand-primary flex items-center gap-[1rem] hover:opacity-80 transition-opacity"
            >
              Compare plans{" "}
              <ImageComponent
                src={icons.linkExternal}
                alt=""
                width={15}
                height={15}
                className="lg:hidden"
              />
            </button>
          </p>
        </div>

        <PlanPreviewAddons
          isAddons={isAddons}
          planType={planType}
          addonsTotal={addonsTotal}
          selectedAddons={selectedAddons}
          bulkSeatsCount={bulkSeatsCount}
          onAddonsClick={onAddonsClick}
          isYearly={isYearly}
        />
      </div>

      <PlanPreviewPricing
        totalPrice={totalPrice}
        addonsTotal={addonsTotal}
        isYearly={isYearly}
        isOneSided={isOneSided}
        planType={planType}
        isMenuOpen={isMenuOpen}
        onUpgradeClick={onUpgradeClick}
        onMenuToggle={onMenuToggle}
        onSeeDetailsClick={onSeeDetailsClick}
        menuRef={menuRef}
        actionLabel={actionLabel}
        isActionDisabled={isActionDisabled}
      />
    </div>
  );
}
