import Image from "next/image";
import { ComparisonPlan, ComparisonFeature } from "./types";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";

interface ComparisonDesktopProps {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  icons: Record<string, string | null>;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: () => void;
}

export default function ComparisonDesktop({
  plans,
  features,
  icons,
  onSelectPlan,
  onAddonsClick,
}: ComparisonDesktopProps) {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <div className="min-w-[120rem] border border-input-stroke rounded-[2.4rem] bg-white overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-[20%] p-4 xl:p-[2.8rem] text-left border-b border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-30">
                <h3 className="text-[2.4rem] font-bold text-dark-base-100 mb-3">
                  Compare plans
                </h3>
                <p className="text-md text-dark-base-70 font-normal">
                  Choose your unifiedbeez plan according to your organisational
                  needs
                </p>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className="w-[20%] p-2 xl:p-[2.8rem] text-left border-b border-r border-input-stroke/50 last:border-r-0 relative bg-primary"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      {plan.badge}

                      {plan.addonAvailable ? (
                        <Button
                          onClick={onAddonsClick}
                          variant="secondary"
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-input-stroke/50 text-[1.2rem] font-medium",
                            "text-brand-primary bg-primary font-bold",
                          )}
                        >
                          {plan.addonStatus}
                          {icons.linkExternal && (
                            <Image
                              src={icons.linkExternal as string}
                              alt="link"
                              width={12}
                              height={12}
                            />
                          )}
                        </Button>
                      ) : (
                        <Tooltip
                          content="Add-ons not available on this plan. Upgrade for full access."
                          contentClassName="w-[20rem] text-center"
                          position="bottom"
                        >
                          <Button
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-input-stroke/50 text-[1.2rem] font-medium text-muted bg-gray-50 cursor-default"
                          >
                            {plan.addonStatus}
                          </Button>
                        </Tooltip>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center gap-1.5 mb-1.5 pointer-events-none whitespace-nowrap">
                        <h4 className="text-[1.8rem] font-bold text-dark-base-100">
                          {plan.name}
                        </h4>
                        {plan.tag}
                      </div>
                      <p className="text-[1.4rem] text-dark-base-70 font-normal">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {features.map((feature) => (
              <tr key={feature.key}>
                <td className="p-4 xl:p-[2.8rem] text-base text-dark-base-70 border-b border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-20">
                  {feature.label}
                </td>
                {plans.map((plan) => (
                  <td
                    key={`${plan.id}-${feature.key}`}
                    className="p-8 text-base text-center border-b border-r border-input-stroke/50 last:border-r-0 text-dark-base-100 capitalize"
                  >
                    {plan.values[feature.key]}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td className="p-8 border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-20"></td>
              {plans.map((plan) => (
                <td
                  key={`${plan.id}-cta`}
                  className="p-3 border-r border-input-stroke/50 last:border-r-0"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Button
                      variant={plan.id === "business" ? "primary" : "secondary"}
                      className={cn(
                        "w-full py-2 text-sm font-bold",
                        plan.id === "business" &&
                          "btn-gradient text-primary border-0",
                        plan.isCurrentPlan && "opacity-50 cursor-not-allowed",
                      )}
                      disabled={plan.isCurrentPlan}
                      onClick={() =>
                        !plan.isCurrentPlan && onSelectPlan?.(plan.id)
                      }
                    >
                      {plan.isCurrentPlan ? "Current Plan" : plan.ctaText}
                    </Button>
                    <div className="flex items-center gap-2">
                      {icons.stripeIconCircle && (
                        <Image
                          src={icons.stripeIconCircle as string}
                          alt="stripe"
                          width={16}
                          height={16}
                        />
                      )}
                      <span className="text-[1rem] text-dark-base-70">
                        {plan.footerText}
                      </span>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
