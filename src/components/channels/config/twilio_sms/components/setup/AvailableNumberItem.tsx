"use client";

import { Loader } from "lucide-react";
import Button from "../../../../../ui/Button";
import { TwilioPhoneNumber, AvailableNumberItemProps } from "../../types";

export default function AvailableNumberItem({
  number,
  flag,
  onPurchase,
  isPurchasing,
}: AvailableNumberItemProps) {
  return (
    <div
      className={`w-full py-[1rem] px-[0.8rem] rounded-[0.8rem] border text-left transition-colors bg-primary border-input-stroke hover:border-brand-primary`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[1rem]">
          <span className="text-[2rem] rounded-full">{flag}</span>
          <p className="text-[1.4rem] lg:text-[1.6rem] text-text-primary">
            {number.friendlyName || number.phoneNumber}
          </p>
        </div>

        <Button
          onClick={() => onPurchase(number.phoneNumber)}
          variant="secondary"
          disabled={isPurchasing}
          className="px-[1.6rem] py-[1rem] border-input-stroke min-w-[10rem]"
        >
          {isPurchasing ? <Loader className="w-[2rem] h-[2rem]" /> : "Purchase"}
        </Button>
      </div>
    </div>
  );
}
