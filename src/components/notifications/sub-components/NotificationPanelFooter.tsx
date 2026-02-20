import React from "react";
import Link from "next/link";

interface NotificationPanelFooterProps {
  onViewAll: () => void;
}

export default function NotificationPanelFooter({
  onViewAll,
}: NotificationPanelFooterProps) {
  return (
    <div className="p-[2rem] border-t border-input-stroke">
      <Link
        href="/notifications"
        onClick={onViewAll}
        className="flex items-center justify-center w-full py-[1.4rem] rounded-[1.2rem] bg-input-stroke/10 text-text-secondary font-bold text-[1.4rem] hover:bg-input-stroke/20 transition-all border border-input-stroke"
      >
        View all
      </Link>
    </div>
  );
}
