"use client";

import { cn } from "../../../../../lib/utils";
import Input from "../../../../forms/Input";
import Button from "../../../../ui/Button";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import ToggleSwitch from "../../../../ui/ToggleSwitch";

interface BudgetSettingsAdjustProps {
  monthlyLimit: number;
  setMonthlyLimit: (limit: number) => void;
  budgetAlerts?: boolean;
  onToggleAlerts?: () => void;
  autoAdjustBudget?: boolean;
  onToggleAutoAdjust?: () => void;
  onUpdateLimit: () => void;
  title?: string;
  className?: string;
}

export default function BudgetSettingsAdjust({
  monthlyLimit,
  setMonthlyLimit,
  budgetAlerts,
  onToggleAlerts,
  autoAdjustBudget,
  onToggleAutoAdjust,
  onUpdateLimit,
  title = "Budget Settings",
  className,
}: BudgetSettingsAdjustProps) {
  return (
    <div
      className={cn(
        "mt-[2.4rem] bg-primary border border-border rounded-[2rem] p-[2.4rem]",
        className,
      )}
    >
      <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[2.4rem]">
        {title}
      </Heading>

      <div className="flex flex-col gap-[3.2rem]">
        {/* Monthly Budget Limit */}
        <div>
          <Text className="text-[1.2rem] font-bold text-text-secondary mb-[0.8rem]">
            Monthly Budget Limit
          </Text>
          <div className="flex items-center gap-[1.2rem]">
            <div className="flex-1 max-w-[40rem]">
              <Input
                type="number"
                value={monthlyLimit.toString()}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                leftIcon={
                  <span className="text-[1.8rem] text-text-primary/40 font-bold ml-[0.4rem]">
                    £
                  </span>
                }
                placeholder="Enter limit"
                className="w-full"
              />
            </div>
            <Button variant="primary" onClick={onUpdateLimit}>
              Update
            </Button>
          </div>
        </div>

        {/* Budget Alerts */}
        {onToggleAlerts && (
          <div className="flex items-center justify-between p-[2rem] border border-border rounded-[2rem]">
            <div>
              <Text className="text-[1.4rem] font-bold text-text-secondary mb-[0.4rem]">
                Budget Alerts
              </Text>
              <Text className="text-[1.2rem] text-text-primary/60">
                Get notified when you reach 80% of your budget
              </Text>
            </div>
            <ToggleSwitch isActive={!!budgetAlerts} onToggle={onToggleAlerts} />
          </div>
        )}

        {/* Auto-adjust Budget */}
        {onToggleAutoAdjust && (
          <div className="flex items-center justify-between p-[2rem] border border-border rounded-[2rem]">
            <div>
              <Text className="text-[1.4rem] font-bold text-text-secondary mb-[0.4rem]">
                Auto-adjust Budget
              </Text>
              <Text className="text-[1.2rem] text-text-primary/60">
                Automatically increase budget when needed
              </Text>
            </div>
            <ToggleSwitch
              isActive={!!autoAdjustBudget}
              onToggle={onToggleAutoAdjust}
            />
          </div>
        )}
      </div>
    </div>
  );
}
