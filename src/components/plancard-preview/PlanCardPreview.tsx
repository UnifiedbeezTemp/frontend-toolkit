"use client";

import ImageComponent from "next/image";
import Link from "next/link";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import DotsMenu from "../ui/DotsMenu";
import { useCheckoutPlan } from "./hooks/useCheckoutPlan";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlan } from "../../api/services/plan/hooks/usePlan";
import PlanCardPreviewSkeleton from "./PlanCardPreviewSkeleton";
import { cn } from "../../lib/utils";
import { Addon } from "../../store/onboarding/types/addonTypes";

interface Props {
  isAddons: boolean;
  selectedAddons?: Addon[];
  planType?: string;
  isYearly: boolean;
  isOneSided?: boolean;
}

export default function PlanCardPreview({
  isAddons,
  selectedAddons,
  planType,
  isYearly = false,
  isOneSided = false,
}: Props) {
  const { plan: backendPlan, loading, error, retry } = usePlan({ planType });
  const { plan, displayPrice } = useCheckoutPlan({ backendPlan, isYearly });
  const icons = useSupabaseIcons();
  const router = useRouter();
  const calculateAddonsTotal = () => {
    if (!selectedAddons || selectedAddons.length === 0) return 0;

    return selectedAddons.reduce((total, addon) => {
      return total + addon.price * (addon.used || 1);
    }, 0);
  };

  const addonsTotal = calculateAddonsTotal();
  const totalPrice = displayPrice + addonsTotal;

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
            "flex text-[1.4rem] flex-col m t-[1rem] gap-[1.3rem] sm:gap-[0.4rem]",
            isOneSided ? "sm:flex-col lg:flex-row" : "sm:flex-row"
          )}
        >
          <p className={cn("flex ", isOneSided ? "sm:flex-col lg:flex-row" : "sm:flex-row")}>
            The most important features of your plan.
            <Link
              href="/plans"
              className="underline font-[700] text-brand-primary flex items-center gap-[1rem]"
            >
              Compare plans {" "}
              <ImageComponent
                src={icons.linkExternal}
                alt=""
                width={15}
                height={15}
                className="sm:hidden"
              />
            </Link>
          </p>
        </div>

        {!isAddons && (
          <div className="mt-[3rem] sm:mt-[5rem]">
            <Button
              variant="secondary"
              onClick={() => router.push(`/addons?plan=${plan.id}`)}
              className="text-[1.3rem] font-[700] border-border bg-primary trasition-all hover:scale-98 border rounded-[.3rem] px-[0.6rem] py-[.3rem]"
            >
              Add-ons {addonsTotal > 0 ? `£${addonsTotal}` : ""}
            </Button>

            <div className="flex flex-wrap items-center mt-[1rem] gap-[1rem]">
              {selectedAddons?.map((addon) => (
                <div className="flex items-start gap-[.62rem]" key={addon.id}>
                  <div className="bg-success rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem] shrink-0">
                    <ImageComponent
                      src={icons.checkMark}
                      alt=""
                      width={10}
                      height={10}
                    />
                  </div>
                  <Text size="xs" className="font-[700] text-[1rem]">
                    {addon.name} x {addon.used}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
            £{addonsTotal > 0 ? totalPrice : displayPrice}
          </span>
          <span className="text-[1rem] font-[700] text-text-primary">
            /per {isYearly ? "year" : "month"}
          </span>
        </div>

        <div className="flex gap-[1rem]">
          <Button
            className={cn(" px-[1.6rem]", isOneSided ? "w-full" : "w-full")}
          >
            Upgrade Plan
          </Button>
          <Button variant="secondary">
            <DotsMenu />
          </Button>
        </div>
      </div>
    </div>
  );
}
