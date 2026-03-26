"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import TimesIcon  from "../../../../../../assets/icons/TimesIcon";
import CalendarIcon from "../../../../../../assets/icons/CalendarIcon";

interface ReportHeaderProps {
  period: string;
  daysRemaining: number;
  onClose: () => void;
}

export default function ReportHeader({
  period,
  daysRemaining,
  onClose,
}: ReportHeaderProps) {
  return (
    <div className="p-[2.4rem] border-b border-border">
      <div className="flex justify-between items-start mb-[0.8rem]">
        <div>
          <Heading className="text-[2rem] font-bold text-text-secondary leading-tight">
            Full Usage Report
          </Heading>
          <Text className="text-[1.4rem] text-text-primary font-medium">
            Comprehensive overview of your usage across all services
          </Text>
        </div>
        <button
          onClick={onClose}
          className="p-[0.8rem] hover:bg-input-filled rounded-full transition-colors"
        >
          <TimesIcon size={20} color="var(--text-primary)" />
        </button>
      </div>

      <div className="flex items-center gap-[1.6rem] mt-[1.6rem]">
        <div className="flex items-center gap-[0.8rem] bg-input-filled px-[1.2rem] py-[0.6rem] rounded-[0.8rem]">
          <CalendarIcon size={16} color="var(--text-primary)" />
          <Text className="text-[1.2rem] text-text-secondary font-bold">
            {period}
          </Text>
        </div>
        <Text className="text-[1.2rem] text-text-primary font-medium">
          Days remaining:{" "}
          <span className="text-text-secondary font-bold">{daysRemaining}</span>
        </Text>
      </div>
    </div>
  );
}
