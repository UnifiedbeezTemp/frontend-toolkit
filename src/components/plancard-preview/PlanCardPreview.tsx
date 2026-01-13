"use client";

import ImageComponent from "next/image";
import Link from "next/link";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import DotsMenu from "../ui/DotsMenu";
import { useCheckoutPlan } from "./hooks/useCheckoutPlan";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { useRouter } from "next/navigation";
import { usePlan } from "../../api/services/plan/hooks/usePlan";
import PlanCardPreviewSkeleton from "./PlanCardPreviewSkeleton";
import { cn } from "../../lib/utils";
import { Addon } from "../../store/onboarding/types/addonTypes";

import { usePlanCardPreview } from "./hooks/usePlanCardPreview";
import { PlanCardPreviewProps } from "./types";
import PlanSelectionRequiredModal from "../plan-selection/modals/PlanSelectionRequiredModal";
import PlanPreviewModal from "./components/PlanPreviewModal";
import PlanPreviewAddons from "./components/PlanPreviewAddons";
import PlanPreviewPricing from "./components/PlanPreviewPricing";

export default function PlanCardPreview({
  isAddons,
  selectedAddons,
  planType,
  isYearly = false,
  isOneSided = false,
}: PlanCardPreviewProps) {
  const { plan: backendPlan, loading, error, retry } = usePlan({ planType });
  const { plan, displayPrice, monthlyPrice } = useCheckoutPlan({
    backendPlan,
    isYearly,
  });
  const icons = useSupabaseIcons();

  const {
    isMenuOpen,
    isModalOpen,
    setIsModalOpen,
    isAddonsModalOpen,
    setIsAddonsModalOpen,
    menuRef,
    handleAddonsClick,
    handleUpgradeClick,
    handleMenuToggle,
    handleSeeDetailsClick,
    addonsTotal,
    totalPrice,
    addonsToUse,
  } = usePlanCardPreview({
    plan,
    selectedAddons,
    monthlyPrice,
    isYearly,
  });

  if (loading) {
    return <PlanCardPreviewSkeleton />;
  }

  if (error) {
    return (
      <div className="border border-border p-[2rem] rounded-[1rem] mt-[2.3rem] layout-body shadow">
        <Heading className="text-red-600 mb-4">Failed to Load Plan</Heading>
        <Text className="text-text-secondary mb-4">
          We couldn't load your selected plan. Please try again.
        </Text>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => retry()}
            className="text-[1.3rem] font-[700]"
          >
            Retry
          </Button>
          <Link
            href="/plans"
            className="underline text-[1.4rem] text-brand-primary flex items-center gap-[1rem] hover:scale-98 transition-all"
          >
            Select a Different Plan
            <ImageComponent
              src={icons.linkExternal}
              alt=""
              width={15}
              height={15}
            />
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="border border-border p-[2rem] rounded-[1rem] mt-[2.3rem] layout-body shadow">
        <Heading className="">No Plan Selected</Heading>
        <Text className="text-text-secondary mb-4">
          Please select a plan to continue with your checkout.
        </Text>
        <Link
          href="/plans"
          className="underline text-[1.4rem] text-brand-primary text-left flex items-center gap-[1rem] hover:scale-98 transition-all"
        >
          Select a Plan{" "}
          <ImageComponent
            src={icons.linkExternal}
            alt=""
            width={15}
            height={15}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "border border-border p-[1rem] rounded-[1rem] mt-[2.3rem] layout-body shadow flex flex-col gap-[3.1rem]",
          isOneSided
            ? " sm:flex-col lg:flex-row lg:justify-between"
            : " sm:flex-row"
        )}
      >
        <div className={cn("flex-1", isOneSided ? "sm:w-[50%]" : "w-full")}>
          <div className="">{plan.badge}</div>

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
              isOneSided ? "sm:flex-col lg:flex-row" : "sm:flex-row"
            )}
          >
            <p
              className={cn(
                "",
                isOneSided
                  ? "sm:flex-col lg:flex lg:flex-row"
                  : "sm:flex sm:flex-row gap-[0.4rem] text-[1.4rem]"
              )}
            >
              The most important features of your plan.{" "}
              <Link
                href="/plans"
                className="underline font-[700] text-brand-primary flex items-center gap-[1rem]"
              >
                Compare plans{" "}
                <ImageComponent
                  src={icons.linkExternal}
                  alt=""
                  width={15}
                  height={15}
                  className="lg:hidden"
                />
              </Link>
            </p>
          </div>

          <PlanPreviewAddons
            isAddons={isAddons}
            planType={planType}
            addonsTotal={addonsTotal}
            selectedAddons={addonsToUse}
            onAddonsClick={handleAddonsClick}
          />
        </div>

        <PlanPreviewPricing
          totalPrice={totalPrice}
          addonsTotal={addonsTotal}
          isYearly={isYearly}
          isOneSided={isOneSided}
          planType={planType}
          isMenuOpen={isMenuOpen}
          onUpgradeClick={handleUpgradeClick}
          onMenuToggle={handleMenuToggle}
          onSeeDetailsClick={handleSeeDetailsClick}
          menuRef={menuRef}
        />
      </div>

      <PlanPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
        isYearly={isYearly}
        totalPrice={totalPrice}
        onAddonsClick={handleAddonsClick}
        onSelect={handleUpgradeClick}
      />

      <PlanSelectionRequiredModal
        isOpen={isAddonsModalOpen}
        onClose={() => setIsAddonsModalOpen(false)}
      />
    </>
  );
}
