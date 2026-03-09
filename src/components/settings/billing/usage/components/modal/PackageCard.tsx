"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { cn } from "../../../../../../lib/utils";
import { MessagePackage } from "../../hooks/useUsageSettings";

interface PackageCardProps {
  pkg: MessagePackage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function PackageCard({
  pkg,
  isSelected,
  onSelect,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "p-[1.6rem] border rounded-[1.2rem] cursor-pointer transition-all relative flex flex-col gap-[1.2rem]",
        isSelected
          ? "layout-body border-border"
          : "border-border bg-white hover:border-brand-primary/50",
      )}
      onClick={() => onSelect(pkg.id)}
    >
      {pkg.popular && (
        <div className="absolute top-[-1.2rem] right-[1.4rem] bg-brand-primary text-white text-[0.8rem] font-bold px-[0.6rem] py-[0.4rem] rounded-[0.4rem]">
          Most Popular
        </div>
      )}

      <div className="flex flex-col gap-[0.2rem]">
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          {pkg.amount.toLocaleString()}
        </Heading>
        <Text className="text-[1.2rem] text-text-primary">SMS messages</Text>
      </div>

      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-col gap-[0.2rem]">
          <Heading className="text-[2rem] font-bold text-text-secondary">
            £{pkg.price}
          </Heading>
          <Text className="text-[1.2rem] text-text-primary">
            {pkg.pricePerUnit}
          </Text>
        </div>
        {pkg.saving && (
          <div className="text-success text-[1.2rem] font-bold px-[0.8rem] py-[0.4rem] bg-success/10 rounded-[0.6rem]">
            {pkg.saving}
          </div>
        )}
      </div>
    </div>
  );
}
