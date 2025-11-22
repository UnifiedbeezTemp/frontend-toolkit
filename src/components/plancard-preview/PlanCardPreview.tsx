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
import { Addon } from "../../store/onboarding/slices/addonSlice";

interface Props {
  isAddons: boolean;
  selectedAddons?: Addon[];
  addonsTotal?: number;
}

export default function PlanCardPreview({ isAddons, selectedAddons, addonsTotal = 0 }: Props) {
  const { plan, isYearly, displayPrice } = useCheckoutPlan();
  const icons = useSupabaseIcons();
  const router = useRouter();

  if (!plan) {
    return (
      <div className="border border-border p-[2rem] rounded-[1rem] mt-[2.3rem] layout-body shadow">
        <Heading className="">No Plan Selected</Heading>
        <Text className="text-text-secondary mb-4">
          Please select a plan to continue with your checkout.
        </Text>
        <Link
          href="/plans"
          className="underline text-[1.4rem] text-brand-primary text-left flex items-enter gap-[.1rem] hover:scale-98 transition-all"
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
    <div className="border border-border p-[1rem] rounded-[1rem] mt-[2.3rem] layout-body shadow flex flex-col sm:flex-row gap-[3.1rem]">
      <div className="flex-1">
        <div className="">{plan.badge}</div>

        <div className="flex items-center gap-[1rem] mt-[1rem]">
          <Heading className="text-[2rem] sm:text-[2.4rem]">
            {plan.title}
          </Heading>

          <div className="border border-brand-primary rounded-full text-brand-primary p-[0.5rem] py-[0.2rem] text-[1rem] bg-brand-primary/5 sm:text-[1.2rem] sm:font-[700]">
            Your plan
          </div>
        </div>

        <div className="flex text-[1.4rem] flex-col mt-[1rem] gap-[1.3rem] sm:flex-row sm:gap-[0.4rem]">
          <p className="">The most important features of your plan.</p>
          <Link
            href="/plans"
            className="underline font-[700] text-brand-primary flex items-center gap-[1rem]"
          >
            Compare plans
            <ImageComponent
              src={icons.linkExternal}
              alt=""
              width={15}
              height={15}
              className="sm:hidden"
            />
          </Link>
        </div>

        {!isAddons && (
          <div className="mt-[3rem] sm:mt-[5rem]">
            <Button
              variant="secondary"
              onClick={() => router.push(`/addons?plan=${plan.id}`)}
              className="text-[1.3rem] font-[700] border-border bg-primary trasition-all hover:scale-98 border rounded-[.3rem] px-[0.6rem] py-[.3rem]"
            >
              Add-ons
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
                    {addon.name}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-col-reverse gap-[1rem] sm:justify-between">
        <div className="sm:mb-[-1rem]">
          <span className="text-[4rem] font-[700] text-brand-primary">
            £{displayPrice + addonsTotal}
          </span>
          <span className="text-[1rem] font-[700] text-text-primary">
            /per {isYearly ? "year" : "month"}
          </span>
        </div>

        <div className="flex gap-[1rem]">
          <Button className="w-full">Upgrade Plan</Button>
          <Button variant="secondary">
            <DotsMenu />
          </Button>
        </div>
      </div>
    </div>
  );
}
