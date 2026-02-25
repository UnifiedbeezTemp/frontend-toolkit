import React from "react";
import CloseModalButton from "@/shared/src/components/modal/CloseModalButton";

interface NotificationPanelHeaderProps {
  onClose: () => void;
}

export default function NotificationPanelHeader({
  onClose,
}: NotificationPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between p-[2rem] border-b border-border">
      <h2 className="text-[2rem] font-bold text-text-secondary">
        Notifications
      </h2>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}
