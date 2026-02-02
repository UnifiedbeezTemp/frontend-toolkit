"use client";

import Heading from "../../../../../ui/Heading";
import { TwilioPhoneNumber, AvailableNumbersListProps } from "../../types";
import AvailableNumberItem from "./AvailableNumberItem";

export default function AvailableNumbersList({
  numbers,
  countryFlag,
  onPurchase,
  purchasingPhoneNumber,
}: AvailableNumbersListProps) {
  if (numbers.length === 0) return null;

  return (
    <div className="pt-[2.4rem] border-t border-input-stroke">
      <Heading size="sm" className="mb-[1.2rem] text-[1.4rem] lg:text-[1.6rem]">
        Available Numbers
      </Heading>
      <div className="space-y-[1rem] max-h-[30rem] overflow-y-auto pr-[0.4rem]">
        {numbers.map((number) => (
          <AvailableNumberItem
            key={number.phoneNumber}
            number={number}
            flag={countryFlag}
            onPurchase={onPurchase}
            isPurchasing={purchasingPhoneNumber === number.phoneNumber}
          />
        ))}
      </div>
    </div>
  );
}
