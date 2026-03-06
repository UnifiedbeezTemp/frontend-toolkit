"use client";

import Text from "../../../../../ui/Text";
import CardIcon from "../../../../../../assets/icons/CardIcon";
import { cn } from "../../../../../../lib/utils";
import Input from "../../../../../forms/Input";
import Button from "../../../../../ui/Button";

export default function PaymentMethodSelector() {
  return (
    <div className="space-y-[1rem]">
      <Text className="text-[1.4rem] font-[500] text-text-secondary">
        Payment Method
      </Text>

      <div className="flex items-center justify-between p-[1.6rem] border border-border rounded-[1.2rem] bg-primary">
        <div className="flex items-center gap-[1.2rem]">
          <div className="w-[2rem] h-[2rem] border border-text-primary rounded-full flex items-center justify-center">
            <div className="w-[1rem] h-[1rem] bg-text-primary rounded-full"></div>
          </div>
          <CardIcon size={24} color="var(--text-primary)" />
          <div>
            <Text className="text-[1.6rem] text-text-secondary font-bold">
              Credit Card
            </Text>
            <Text className="text-[1.2rem] text-text-primary/60">
              Visa, Mastercard, Amex
            </Text>
          </div>
        </div>
      </div>

      {/* Promo Code section */}
      <div className="space-y-[0.8rem]">
        <Text className="text-[1.4rem] text-text-secondary font-medium">
          Promo Code (Optional)
        </Text>
        <div className="flex gap-[1.2rem]">
          <Input
            placeholder="Enter promo code"
            className="flex-1"
            inputClassName=""
          />
          <Button variant="secondary" className="px-[2.4rem]">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
