import { useState } from "react";
import Image from "next/image";
import { ComparisonPlan, ComparisonFeature } from "./types";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface ComparisonMobileProps {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  icons: Record<string, string | null>;
  onSelectPlan?: (planId: string) => void;
}

export default function ComparisonMobile({
  plans,
  features,
  icons,
  onSelectPlan,
}: ComparisonMobileProps) {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextPlan = () => {
    setActiveIndex((prev) => (prev + 1) % plans.length);
  };

  const prevPlan = () => {
    setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const activePlan = plans[activeIndex];

  if (!activePlan) return null;

  const monthlyPriceStr = String(activePlan.values.monthlyPrice);
  const priceMatch = monthlyPriceStr.match(/£(\d+)/);
  const displayPrice = priceMatch ? parseInt(priceMatch[1]) : 0;
  
  const seatsStr = String(activePlan.values.seats);
  const aiAssistantsStr = String(activePlan.values.aiAssistants);
  const seatsMatch = seatsStr.match(/(\d+)/);
  const aiMatch = aiAssistantsStr.match(/(\d+)/);
  const seats = seatsMatch ? parseInt(seatsMatch[1]) : 0;
  const aiAssistants = aiMatch ? parseInt(aiMatch[1]) : 0;

  return (
    <div className="block lg:hidden px-4 mb-20 relative">
      <div className="absolute -top-2 right-2 z-10">
        {activePlan.tag}
      </div>

      <Card className="pt-6 pb-4 px-0 rounded-[1.2rem] w-full transition-all duration-300 relative">
        <div className="absolute top-6 right-5.25">
          <div className="*:border *:border-border *:rounded-[0.325rem] *:px-1.25 *:py-0.5">
            {activePlan.addonAvailable ? (
              <button className="inline-flex items-center gap-1.25 text-dark-base-70 text-md font-medium">
                Add-on available
                {icons.linkExternal && (
                  <Image
                    src={icons.linkExternal as string}
                    alt=""
                    width={16}
                    height={16}
                  />
                )}
              </button>
            ) : (
              <span className="inline-block text-md text-inactive-color bg-[#F5F5F5] rounded-sm px-[1.2rem]">
                Add-on not available
              </span>
            )}
          </div>
        </div>

        <div className="px-5.25 w-full">
          <div className="flex items-center gap-3.5">
            {activePlan.badge}
            <h3 className="text-brand-primary font-bold text-base">
              {activePlan.name}
            </h3>
          </div>
        </div>

        <div className="mt-4.75 py-4 border-y border-inactive-color/30">
          <div className="flex justify-evenly items-center *:first:pl-2 sm:*:first:pl-5.25 *:last:pr-1.25 sm:*:last:pr-5.25 text-xs sm:text-md text-text-primary">
            <div className="flex items-baseline">
              <span>£{displayPrice}</span>
              <span>/month</span>
            </div>
            <div className="w-px bg-text-primary/25 self-stretch" />
            <div className="flex items-center gap-[0.6rem]">
              {icons.seatsIcon && (
                <Image
                  src={icons.seatsIcon as string}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              )}
              <span>
                {seats} Seat{seats !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="w-px bg-text-primary/25 self-stretch" />
            <div className="flex items-center gap-[0.6rem]">
              {icons.chatBot && (
                <Image
                  src={icons.chatBot as string}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              )}
              <span>
                {aiAssistants} AI Assistant{aiAssistants !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-input-filled divide-y divide-border">
          {features.slice(3).map((feature) => (
            <div key={feature.key} className="py-4 px-5.25">
              <p className="text-md text-dark-base-70">
                <span className="font-medium">{feature.label}:</span>{" "}
                {activePlan.values[feature.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="px-5.25 pt-4 pb-1.25">
          <div className="flex items-center gap-2 mb-3.25">
            <Button
              variant={activePlan.id === "business" ? "primary" : "secondary"}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold",
                activePlan.id === "business" && "btn-gradient text-primary border-0",
                activePlan.isCurrentPlan && "opacity-50 cursor-not-allowed"
              )}
              disabled={activePlan.isCurrentPlan}
              onClick={() => !activePlan.isCurrentPlan && onSelectPlan?.(activePlan.id)}
            >
              {activePlan.isCurrentPlan ? "Current Plan" : activePlan.ctaText}
            </Button>

            <div className="flex gap-2">
              <button
                onClick={prevPlan}
                className="w-10 h-10 flex items-center justify-center border border-input-stroke rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Previous plan"
              >
                {icons.chevronDown && (
                  <Image
                    src={icons.chevronDown as string}
                    alt="back"
                    width={20}
                    height={20}
                    className="opacity-60 rotate-90"
                  />
                )}
              </button>
              <button
                onClick={nextPlan}
                className="w-10 h-10 flex items-center justify-center border border-input-stroke rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Next plan"
              >
                {icons.chevronDown && (
                  <Image
                    src={icons.chevronDown as string}
                    alt="next"
                    width={20}
                    height={20}
                    className="opacity-60 -rotate-90"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {icons.stripeIconCircle && (
              <Image
                src={icons.stripeIconCircle as string}
                alt="stripe"
                width={16}
                height={16}
              />
            )}
            <span className="text-xs text-dark-base-70">{activePlan.footerText}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
