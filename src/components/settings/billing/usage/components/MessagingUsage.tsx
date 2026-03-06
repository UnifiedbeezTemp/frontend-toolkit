"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Button from "../../../../ui/Button";
import UsageStatusBar from "./UsageStatusBar";
import TablerMessageIcon from "../../../../../assets/icons/TablerMessageIcon";
import { MessagingUsageData } from "../hooks/useUsageSettings";

interface MessagingUsageProps {
  data: MessagingUsageData;
  onBuyMore: () => void;
}

export default function MessagingUsage({
  data,
  onBuyMore,
}: MessagingUsageProps) {
  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col gap-[3.2rem]">
      {/* Section Header */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[4.4rem] h-[4.4rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center">
          <TablerMessageIcon size={24} color="var(--text-secondary)" />
        </div>
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          Messaging Usage
        </Heading>
      </div>

      {/* Twilio SMS Usage */}
      <div>
        <UsageStatusBar
          name={data.sms.name}
          used={data.sms.used}
          total={data.sms.total}
          percentage={data.sms.percentage}
          estimate={data.sms.estimate}
          avgPerDay={data.sms.avgPerDay}
        />
        <Button
          variant="ghost"
          className="mt-[2.4rem] border border-brand-primary px-[1.6rem] py-[0.8rem] h-auto text-[1.4rem] font-bold text-brand-primary hover:bg-input-filled transition-colors"
          onClick={onBuyMore}
        >
          Buy more messages
        </Button>
      </div>

      {/* Voice Calls */}
      <div className="pt-[3.2rem] border-t border-border">
        <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[2rem]">
          Voice Calls
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
          {/* Minutes Used */}
          <div className="bg-input-filled border border-border rounded-[1.6rem] p-[2rem]">
            <Text className="text-[1.2rem] text-text-primary font-bold tracking-wider mb-[1.2rem]">
              Minutes Used
            </Text>
            <div className="flex flex-col items-baseline gap-[0.4rem]">
              <Heading className="text-[2.4rem] font-bold text-text-secondary leading-none">
                {data.voice.minutesUsed}
              </Heading>
              <Text className="text-[1.2rem] text-text-primary font-medium">
                this month
              </Text>
            </div>
          </div>

          {/* Active Numbers */}
          <div className="bg-input-filled border border-border rounded-[1.6rem] p-[2rem]">
            <div className="flex justify-between items-start mb-[1.2rem]">
              <Text className="text-[1.2rem] text-text-primary font-bold tracking-wider">
                Active Numbers
              </Text>
              {/* {data.voice.activeNumbers >= data.voice.numbersLimit && (
                <div className="px-[0.8rem] py-[0.2rem] bg-orange-100/10 text-orange-100 text-[1rem] font-bold tracking-wider rounded-full border border-orange-100/20">
                  limit reached
                </div>
              )} */}
            </div>
            <div className="flex flex-col items-baseline gap-[0.4rem]">
              <Heading className="text-[2.4rem] font-bold text-text-secondary leading-none">
                {data.voice.activeNumbers} of {data.voice.numbersLimit}
              </Heading>
              {data.voice.activeNumbers >= data.voice.numbersLimit && (
                <Text className="text-[1.2rem] text-text-primary font-medium">
                  Limit reached
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
