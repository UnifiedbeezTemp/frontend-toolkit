import React from "react";
import { Notification } from "../types";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onNotificationClick,
}: NotificationListProps) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onClick={onNotificationClick}
          />
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-[4rem] text-center opacity-50">
          <p className="text-[1.6rem] font-medium">No notifications yet</p>
          <p className="text-[1.4rem]">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
