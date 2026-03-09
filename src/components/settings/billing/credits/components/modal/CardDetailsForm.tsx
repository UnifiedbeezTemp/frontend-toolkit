"use client";

import Text from "../../../../../ui/Text";
import Input from "../../../../../forms/Input";
import Button from "../../../../../ui/Button";
import PadLockIcon from "../../../../../../assets/icons/PadlockIcon";

export default function CardDetailsForm() {
  return (
    <div className="space-y-[2.4rem]">
      <div className="space-y-[1.6rem]">
        <Input
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          labelClassName="text-[1.4rem] font-medium mb-[0.8rem]"
          inputClassName="h-[4.4rem]"
        />

        <div className="flex gap-[1.6rem]">
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            labelClassName="text-[1.4rem] font-medium mb-[0.8rem]"
            inputClassName="h-[4.4rem]"
          />
          <Input
            label="CVV"
            placeholder="123"
            labelClassName="text-[1.4rem] font-medium mb-[0.8rem]"
            inputClassName="h-[4.4rem]"
          />
        </div>
      </div>

      <div className="flex items-start gap-[1rem] p-[1.6rem] bg-input-filled rounded-[1.2rem]">
        <div className="mt-[0.2rem]">
          <PadLockIcon
            size={16}
            color="var(--text-primary)"
            className="opacity-60"
          />
        </div>
        <Text className="text-[1.3rem] text-text-primary/60 leading-tight">
          Your payment information is encrypted and secure
        </Text>
      </div>
    </div>
  );
}
