import React from "react";
import { cn } from "../../lib/utils";
import { ContactStatus } from "../../../../components/crm/types";

interface StatusPillProps {
  status: ContactStatus;
  className?: string;
}

const statusStyles: Record<
  ContactStatus,
  { text: string; bg: string; label: string }
> = {
  active: {
    text: "var(--crm-status-active-text)",
    bg: "var(--crm-status-active-bg)",
    label: "Active",
  },
  unconfirmed: {
    text: "var(--crm-status-unconfirmed-text)",
    bg: "var(--crm-status-unconfirmed-bg)",
    label: "Unconfirmed",
  },
  unsubscribed: {
    text: "var(--crm-status-unsubscribed-text)",
    bg: "var(--crm-status-unsubscribed-bg)",
    label: "Unsubscribed",
  },
  bounced: {
    text: "var(--crm-status-bounced-text)",
    bg: "var(--crm-status-bounced-bg)",
    label: "Bounced",
  },
};

export default function StatusPill({ status, className }: StatusPillProps) {
  const styles = statusStyles[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[0.6rem] px-[0.8rem] py-[0.2rem] rounded-[1.6rem] text-[1.2rem] font-medium",
        className
      )}
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
      }}
    >
      <span
        className="w-[0.6rem] h-[0.6rem] rounded-full"
        style={{ backgroundColor: styles.text }}
      />
      {styles.label}
    </div>
  );
}
