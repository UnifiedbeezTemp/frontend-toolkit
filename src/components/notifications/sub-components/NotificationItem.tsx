import React from "react";
import Image from "next/image";
import { Notification } from "../types";
import { FileIcon } from "lucide-react";
import MessageIcon from "../../../assets/icons/MessageIcon";
import { cn } from "../../../lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  const isSystem = notification.category === "system";
  const Icon = isSystem ? FileIcon : MessageIcon;

  return (
    <div
      onClick={() => onClick(notification.id)}
      className={cn(
        "flex items-start gap-[1.2rem] py-[2rem] px-[1.6rem] last:border-0 hover:bg-input-filled transition-colors cursor-pointer border-b border-border",
        !notification.isRead && "bg-brand-primary/5",
      )}
    >
      {/* Icon/Avatar Area */}
      <div className="relative">
        {notification.imageUrl ? (
          <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden border border-input-stroke">
            <Image
              src={notification.imageUrl}
              alt={notification.title}
              fill
              className="object-cover"
            />
            {notification.channel && (
              <div className="absolute bottom-0 right-0 w-[1.4rem] h-[1.4rem] bg-primary border border-input-stroke rounded-full flex items-center justify-center p-[0.2rem]">
                <div className="w-full h-full bg-brand-primary rounded-full" />
              </div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "w-[4rem] h-[4rem] rounded-full flex items-center justify-center relative",
              isSystem ? "bg-success/10" : "bg-brand-primary/10",
            )}
          >
            <Icon
              size={20}
              color={isSystem ? "var(--success)" : "var(--brand-primary)"}
            />
            {!notification.isRead && (
              <div className="absolute top-0 left-0 w-[0.8rem] h-[0.8rem] bg-success rounded-full border border-primary" />
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-[0.4rem]">
        <div className="flex items-center justify-between">
          <h4 className="text-[1.4rem] font-bold text-text-secondary">
            {notification.title}
          </h4>
          <span className="text-[1.2rem] text-text-primary/60">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-[1.3rem] text-text-primary/80 leading-[1.4]">
          {notification.content}
        </p>
      </div>
    </div>
  );
}
