"use client";

import Text from "../../../../../ui/Text";
import Heading from "../../../../../ui/Heading";
import { CreditPackage } from "../../hooks/useCreditSettings";

interface PaymentOrderSummaryProps {
  pkg: CreditPackage | null;
}

export default function PaymentOrderSummary({ pkg }: PaymentOrderSummaryProps) {
  if (!pkg) return null;

  return (
    <div className="rounded-[1.2rem] p-[1.6rem] space-y-[1rem] border border-border">
      <div className="flex justify-between items-center">
        <Text className="text-[1.4rem] text-text-primary">Package</Text>
        <Text className="text-[1.6rem] text-text-secondary font-medium">
          {pkg.credits.toLocaleString()} Credits
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text className="text-[1.4rem] text-text-primary">Subtotal</Text>
        <Text className="text-[1.6rem] text-text-secondary font-medium">
          £{pkg.price}
        </Text>
      </div>

      <div className="pt-[1rem] border-t border-border/50 flex justify-between items-center">
        <Text className="text-[1.6rem] text-text-primary font-bold">Total</Text>
        <Heading className="text-[2rem] font-bold text-text-secondary">
          £{pkg.price.toFixed(2)}
        </Heading>
      </div>
    </div>
  );
}
