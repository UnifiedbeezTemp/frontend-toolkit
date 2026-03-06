"use client";

import Text from "../../../../../ui/Text";

import CheckIcon from "../../../../../../assets/icons/CheckIcon";

export default function BuyMessagesInclusions() {
  const inclusions = [
    "Messages added instantly to your account",
    "No expiration date - use at your own pace",
    "Works with all your existing Twilio numbers",
    "24/7 customer support included",
  ];

  return (
    <div className="p-[2rem] bg-input-filled rounded-[1.6rem]">
      <Text className="text-[1.2rem] font-bold text-text-secondary mb-[1.2rem]">
        What's included:
      </Text>
      <div className="flex flex-col gap-[0.8rem]">
        {inclusions.map((item, index) => (
          <div key={index} className="flex items-center gap-[0.8rem]">
            <CheckIcon />
            <Text className="text-[1.2rem] text-text-primary font-medium">
              {item}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
