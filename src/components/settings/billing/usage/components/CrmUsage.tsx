"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Button from "../../../../ui/Button";
import UsageStatusBar from "./UsageStatusBar";
import { UsersDoubleIcon } from "../../../../../assets/icons/UsersDoubleIcon";
import { CrmUsageData } from "../hooks/useUsageSettings";

interface CrmUsageProps {
  data: CrmUsageData;
  onBuyMore: () => void;
}

export default function CrmUsage({ data, onBuyMore }: CrmUsageProps) {
  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col gap-[3.2rem]">
      {/* Section Header */}
      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[4.4rem] h-[4.4rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center">
          <UsersDoubleIcon size={24} color="var(--text-primary)" />
        </div>
        <Heading className="text-[1.8rem] font-bold text-text-secondary">
          CRM Usage
        </Heading>
      </div>

      {/* Contacts Tracking */}
      <div>
        <UsageStatusBar
          name={data.contacts.name}
          used={data.contacts.used}
          total={data.contacts.total}
          percentage={data.contacts.percentage}
        />
      </div>

      {/* CRM Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem]">
        {/* Growth This Month */}
        <div className="bg-input-filled border border-border rounded-[1.6rem] p-[2rem]">
          <Text className="text-[1.2rem] text-text-primary font-bold tracking-wider mb-[1.2rem]">
            Growth This Month
          </Text>
          <div className="flex flex-col items-baseline gap-[0.4rem]">
            <Heading className="text-[2.4rem] font-bold text-[#12b76a] leading-none">
              +{data.growthThisMonth}
            </Heading>
            <Text className="text-[1.2rem] text-text-primary font-medium">
              {data.avgPerDay} per day avg
            </Text>
          </div>
        </div>

        {/* Projected Full */}
        <div className="bg-input-filled border border-border rounded-[1.6rem] p-[2rem]">
          <Text className="text-[1.2rem] text-text-primary font-bold tracking-wider mb-[1.2rem]">
            Projected Full
          </Text>
          <div className="flex flex-col items-baseline gap-[0.4rem]">
            <Heading className="text-[2.4rem] font-bold text-text-secondary leading-none">
              {data.projectedFullDays} days
            </Heading>
            <Text className="text-[1.2rem] text-text-primary font-medium">
              at current growth
            </Text>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        className="mt-[0.8rem] border border-brand-primary px-[1.6rem] py-[0.8rem] h-auto text-[1.4rem] font-bold text-brand-primary hover:bg-input-filled transition-colors w-fit"
        onClick={onBuyMore}
      >
        Buy more contacts
      </Button>
    </div>
  );
}
