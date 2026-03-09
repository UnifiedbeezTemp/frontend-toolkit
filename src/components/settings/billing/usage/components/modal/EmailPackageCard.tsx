"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import Button from "../../../../../ui/Button";
import { cn } from "../../../../../../lib/utils";
import { EmailPackage } from "../../hooks/useUsageSettings";

interface EmailPackageCardProps {
  pkg: EmailPackage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function EmailPackageCard({
  pkg,
  isSelected,
  onSelect,
}: EmailPackageCardProps) {
  return (
    <div
      className={cn(
        "p-[1.6rem] border rounded-[1rem] flex flex-col gap-[1.2rem] items-center text-center transition-all",
        isSelected
          ? "border-border layout-body"
          : "bg-white border-border hover:border-brand-primary/50",
      )}
    >
      <div className="flex flex-col gap-[0.2rem]">
        <Heading className="text-[2.2rem] font-bold text-text-secondary">
          +{pkg.amount.toLocaleString()}
        </Heading>
        <Text className="text-[1.2rem] text-text-primary font-medium">
          Email Sends
        </Text>
      </div>

      <Heading className="text-[1.6rem] font-bold text-text-secondary">
        £{pkg.pricePerMonth}/month
      </Heading>

      <Button
        variant={isSelected ? "primary" : "ghost"}
        className={cn(
          "w-full h-[3.6rem] text-[1.2rem] font-bold border",
          isSelected ? "border-brand-primary" : "border-border",
        )}
        onClick={() => onSelect(pkg.id)}
      >
        {isSelected ? "Selected" : "Select"}
      </Button>
    </div>
  );
}
