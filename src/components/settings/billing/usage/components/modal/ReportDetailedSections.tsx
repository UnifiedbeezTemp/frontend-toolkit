"use client";

import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import {
  MessagingUsageData,
  EmailUsageData,
  CrmUsageData,
  TeamUsageData,
} from "../../hooks/useUsageSettings";
import TablerMessageIcon from "../../../../../../assets/icons/TablerMessageIcon";
import OutlineMail from "../../../../../../assets/icons/OutlineMail";
import { UsersDoubleIcon } from "../../../../../../assets/icons/UsersDoubleIcon";
import BotIcon from "../../../../../../assets/icons/BotIcon";
import { cn } from "../../../../../../lib/utils";

interface ReportDetailedSectionsProps {
  messaging: MessagingUsageData;
  email: EmailUsageData;
  crm: CrmUsageData;
  team: TeamUsageData;
}

const DetailRow = ({
  label,
  value,
  subLabel,
  className,
}: {
  label: string;
  value: string;
  subLabel?: string;
  className?: string;
}) => (
  <div className="flex justify-between items-start py-[0.8rem]">
    <div className="flex flex-col">
      <Text className="text-[1.2rem] text-text-secondary font-bold">
        {label}
      </Text>
      {subLabel && (
        <Text className="text-[1rem] text-text-primary font-medium">
          {subLabel}
        </Text>
      )}
    </div>
    <Text
      className={cn(
        "text-[1.2rem] text-text-secondary font-bold text-right",
        className,
      )}
    >
      {value}
    </Text>
  </div>
);

const DetailCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="p-[2rem] border border-border rounded-[1.6rem]">
    <div className="flex items-center gap-[0.8rem] mb-[1.6rem]">
      {icon}
      <Heading className="text-[1.3rem] font-bold text-text-secondary uppercase tracking-widest">
        {title}
      </Heading>
    </div>
    <div className="divide-y divide-border/30">{children}</div>
  </div>
);

export default function ReportDetailedSections({
  messaging,
  email,
  crm,
  team,
}: ReportDetailedSectionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.6rem]">
      {/* Messaging */}
      <DetailCard
        title="Messaging Usage"
        icon={<TablerMessageIcon size={18} color="var(--cyan-100)" />}
      >
        <DetailRow
          label="Twilio SMS"
          value={`${messaging.sms.percentage.toFixed(1)}%`}
          subLabel={`${messaging.sms.used} of ${messaging.sms.total}`}
        />
        <DetailRow
          label="Voice Minutes"
          value={`${messaging.voice.minutesUsed} min`}
          subLabel="this month"
        />
        <DetailRow
          label="Active Numbers"
          value={messaging.voice.activeNumbers.toString()}
          subLabel={`Limit: ${messaging.voice.numbersLimit}`}
        />
      </DetailCard>

      {/* Email */}
      <DetailCard
        title="Email Usage"
        icon={<OutlineMail size={18} color="var(--primary-blue-100)" />}
      >
        <DetailRow
          label="Monthly Sends"
          value={`${email.monthlySends.percentage.toFixed(1)}%`}
          subLabel={`${email.monthlySends.used} of ${email.monthlySends.total}`}
        />
        <DetailRow
          label="Projected EOM"
          value={email.projectedTotal.toLocaleString()}
          subLabel="end of month forecast"
        />
        <DetailRow
          label="Remaining Sends"
          value={(
            email.monthlySends.total - email.monthlySends.used
          ).toLocaleString()}
          subLabel="available this month"
          className="text-[#29953e]"
        />
      </DetailCard>

      {/* CRM */}
      <DetailCard
        title="CRM Usage"
        icon={<UsersDoubleIcon size={18} color="var(--brand-secondary)" />}
      >
        <DetailRow
          label="Total Contacts"
          value={`${crm.contacts.percentage.toFixed(1)}%`}
          subLabel={`${crm.contacts.used} of ${crm.contacts.total}`}
        />
        <DetailRow
          label="Growth This Month"
          value={`+${crm.growthThisMonth}`}
          subLabel="new avg"
        />
        <DetailRow
          label="Projected Full"
          value={`${crm.projectedFullDays} days`}
          subLabel="at current growth"
        />
      </DetailCard>

      {/* Team */}
      <DetailCard
        title="Team Usage"
        icon={<BotIcon size={18} color="var(--purple)" />}
      >
        <DetailRow
          label="User Seats"
          value={`${team.users.percentage}%`}
          subLabel={`${team.users.used} of ${team.users.total} used`}
        />
        <DetailRow
          label="AI Assistants"
          value={`${team.aiAssistants.percentage}%`}
          subLabel={`${team.aiAssistants.used} of ${team.aiAssistants.total} used`}
        />
        <DetailRow
          label="Available Slots"
          value={(team.aiAssistants.total - team.aiAssistants.used).toString()}
          subLabel="for AI Assistants"
          className="text-[#29953e]"
        />
      </DetailCard>
    </div>
  );
}
