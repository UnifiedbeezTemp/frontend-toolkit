"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { CreditPackage } from "../../hooks/useCreditSettings";

interface SuccessOrderSummaryProps {
  pkg: CreditPackage | null;
}

export default function SuccessOrderSummary({ pkg }: SuccessOrderSummaryProps) {
  if (!pkg) return null;

  return (
    <div className="w-full border border-border rounded-[1.2rem] p-[2.4rem] space-y-[2.4rem]">
      <div className="flex flex-col items-center text-center">
        <Text className="text-[1.4rem] text-text-primary mb-[0.4rem]">
          Credits Added
        </Text>
        <Heading className="text-[3.2rem] font-bold text-text-secondary">
          {pkg.credits.toLocaleString()}
        </Heading>
      </div>

      <div className="space-y-[1.2rem] pt-[2.4rem] border-t border-border/50">
        <div className="flex justify-between items-center text-[1.4rem]">
          <Text className="text-text-primary">Base Credits:</Text>
          <Text className="text-text-secondary font-medium">
            {pkg.credits.toLocaleString()}
          </Text>
        </div>
        <div className="flex justify-between items-center text-[1.4rem]">
          <Text className="text-text-primary">Amount Paid:</Text>
          <Text className="text-text-secondary font-medium">
            £{pkg.price.toFixed(2)}
          </Text>
        </div>
      </div>
    </div>
  );
}
