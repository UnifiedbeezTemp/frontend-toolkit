"use client";

import { cn } from "../../../../../../lib/utils";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import GiftIcon from "../../../../../../assets/icons/GiftIcon";
import { CreditPackage } from "../../hooks/useCreditSettings";

interface CreditPackageItemProps {
  pkg: CreditPackage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function CreditPackageItem({
  pkg,
  isSelected,
  onSelect,
}: CreditPackageItemProps) {
  return (
    <div
      onClick={() => onSelect(pkg.id)}
      className={cn(
        "relative cursor-pointer border-border p-[1.7rem] rounded-[1.2rem] border-2 transition-all duration-200 flex justify-between items-center bg-primary hover:border-brand-primary/30",
        isSelected
          ? "layout-body"
          : "",
      )}
    >
      <div className="flex flex-col gap-[0.4rem]">
        <div className="flex items-center gap-[0.8rem]">
          <Heading className="text-[1.6rem] sm:text-[2rem] font-bold text-text-secondary">
            {pkg.credits.toLocaleString()} Credits
          </Heading>
          {pkg.isPopular && (
            <div className="px-[0.8rem] py-[0.2rem] bg-brand-primary rounded-[0.8rem]">
              <Text className="text-[1rem] font-bold text-white uppercase">
                Popular
              </Text>
            </div>
          )}
        </div>
        <div className="flex items-center gap-[0.6rem]">
          <GiftIcon size={25} color={isSelected ? "var(--brand-primary)" : "var(--text-primary)"} />
          <Text className={cn("text-[1.4rem] text-text-primary font-medium mt-[1rem]", isSelected ? "text-brand-primary" : "text-text-primary")}>
            +{pkg.bonusCredits.toLocaleString()} bonus credits
          </Text>
        </div>
      </div>

      <Heading className="text-[2.2rem] sm:text-[2.4rem] font-bold text-text-secondary">
        £{pkg.price}
      </Heading>

      {/* Selected Indicator/Layout Body styling if needed */}
      {isSelected && <div className="layout-body hidden" />}
    </div>
  );
}
